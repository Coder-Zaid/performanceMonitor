import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getRankings(orgId: string, period: 'daily' | 'weekly' | 'monthly' = 'daily') {
    const now = new Date();
    let startDate = new Date();

    if (period === 'daily') {
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'weekly') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
      startDate.setDate(diff);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'monthly') {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
    }

    // Aggregate performance entries
    const rankings = await this.prisma.performanceEntry.groupBy({
      by: ['userId'],
      where: {
        orgId,
        status: 'approved',
        submissionDate: { gte: startDate },
      },
      _sum: {
        submittedValue: true,
      },
      orderBy: {
        _sum: {
          submittedValue: 'desc',
        },
      },
      take: 20, // Top 20
    });

    // Fetch user details
    const userIds = rankings.map(r => r.userId);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImageUrl: true,
        department: { select: { name: true } },
      },
    });

    return rankings.map((r, index) => {
      const user = users.find(u => u.id === r.userId);
      return {
        rank: index + 1,
        userId: r.userId,
        name: `${user?.firstName} ${user?.lastName}`,
        profileImageUrl: user?.profileImageUrl,
        department: user?.department?.name,
        score: r._sum.submittedValue || 0,
      };
    });
  }
}
