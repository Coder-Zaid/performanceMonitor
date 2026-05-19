import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PerformanceEntryService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {}

  async submit(userId: string, orgId: string, dto: CreateEntryDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if entry already exists for this user, date, and KPI
    const existing = await this.prisma.performanceEntry.findUnique({
      where: {
        userId_submissionDate_kpiId: {
          userId,
          submissionDate: today,
          kpiId: dto.kpiId,
        },
      },
    });

    if (existing) {
      // Add the new value to the existing value instead of overwriting it
      return this.prisma.performanceEntry.update({
        where: { id: existing.id },
        data: {
          submittedValue: existing.submittedValue + dto.value,
          notes: dto.notes ? (existing.notes ? `${existing.notes}; ${dto.notes}` : dto.notes) : existing.notes,
          status: 'pending', // Reset status to pending on update
        },
      });
    }

    return this.prisma.performanceEntry.create({
      data: {
        orgId,
        userId,
        kpiId: dto.kpiId,
        submittedValue: dto.value,
        notes: dto.notes,
        submissionDate: today,
      },
    });
  }

  async findByDate(userId: string, date: Date) {
    date.setHours(0, 0, 0, 0);
    return this.prisma.performanceEntry.findMany({
      where: {
        userId,
        submissionDate: date,
      },
      include: {
        kpi: true,
      },
    });
  }

  async getSummary(userId: string, orgId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { teams: true },
    });
    if (!user) return [];

    const teamIds = user.teams.map((t) => t.teamId);

    const kpis = await this.prisma.kpi.findMany({
      where: {
        orgId,
        isActive: true,
        OR: [
          { departmentId: null, teamId: null },
          { departmentId: user.departmentId },
          { teamId: { in: teamIds } },
        ],
      },
    });

    const entries = await this.findByDate(userId, today);
    
    return kpis.map((kpi) => {
      const entry = entries.find((e) => e.kpiId === kpi.id);
      const current = entry ? entry.submittedValue : 0;
      const target = kpi.targetValue || 100;
      return {
        kpiName: kpi.name,
        current,
        target,
        percentage: Math.min(100, Math.round((current / target) * 100)),
        unit: kpi.unit || '',
      };
    });
  }

  async findPending(orgId: string, managerId?: string) {
    return this.prisma.performanceEntry.findMany({
      where: {
        orgId,
        status: 'pending',
        user: managerId ? { managerId } : undefined,
      },
      include: {
        user: true,
        kpi: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async reviewEntry(id: string, reviewerId: string, status: 'approved' | 'rejected', notes?: string) {
    const entry = await this.prisma.performanceEntry.update({
      where: { id },
      data: {
        status,
        reviewedBy: reviewerId,
        reviewNotes: notes,
      },
      include: { kpi: true },
    });

    // Notify user
    await this.notificationService.create(entry.userId, entry.orgId, {
      title: `Entry ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Your entry for ${entry.kpi?.name || 'KPI'} has been ${status}.`,
      type: 'performance_review',
    });

    return entry;
  }
}
