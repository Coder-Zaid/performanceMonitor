import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KpiService {
  constructor(private prisma: PrismaService) {}

  async findAll(orgId: string) {
    return this.prisma.kpi.findMany({
      where: { orgId },
      include: {
        department: true,
        team: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findForUser(userId: string, orgId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        teams: true,
      },
    });

    if (!user) return [];

    const teamIds = user.teams.map(t => t.teamId);

    return this.prisma.kpi.findMany({
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
  }

  async create(orgId: string, data: any) {
    return this.prisma.kpi.create({
      data: {
        ...data,
        orgId,
      },
    });
  }

  async update(id: string, orgId: string, data: any) {
    const kpi = await this.prisma.kpi.findFirst({
      where: { id, orgId },
    });

    if (!kpi) {
      throw new NotFoundException('KPI not found');
    }

    return this.prisma.kpi.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, orgId: string) {
    const kpi = await this.prisma.kpi.findFirst({
      where: { id, orgId },
    });

    if (!kpi) {
      throw new NotFoundException('KPI not found');
    }

    return this.prisma.kpi.delete({
      where: { id },
    });
  }
}
