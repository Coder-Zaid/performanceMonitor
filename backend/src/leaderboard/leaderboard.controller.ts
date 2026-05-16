import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('leaderboards')
@UseGuards(ClerkAuthGuard)
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get()
  getRankings(
    @CurrentUser() user: any,
    @Query('period') period: 'daily' | 'weekly' | 'monthly' = 'daily',
  ) {
    return this.leaderboardService.getRankings(user.orgId, period);
  }
}
