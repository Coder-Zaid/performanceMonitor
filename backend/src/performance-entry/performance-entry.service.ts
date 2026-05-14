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
      // Update existing entry or throw error? 
      // For now, let's update it to allow "re-submission"
      return this.prisma.performanceEntry.update({
        where: { id: existing.id },
        data: {
          submittedValue: dto.value,
          notes: dto.notes,
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

  async getSummary(userId: string) {
    // Basic summary for the employee dashboard
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const entries = await this.findByDate(userId, today);
    
    // In a real app, we'd also fetch targets here
    return {
      entries,
      count: entries.length,
      lastUpdated: new Date(),
    };
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
