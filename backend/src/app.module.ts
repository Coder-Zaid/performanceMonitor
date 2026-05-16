import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClerkAuthGuard } from './common/guards/clerk-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { KpiModule } from './kpi/kpi.module';
import { PerformanceEntryModule } from './performance-entry/performance-entry.module';
import { OrganizationModule } from './organization/organization.module';
import { TargetModule } from './target/target.module';
import { DepartmentModule } from './department/department.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    KpiModule,
    PerformanceEntryModule,
    OrganizationModule,
    TargetModule,
    DepartmentModule,
    TeamModule,
    UserModule,
    LeaderboardModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClerkAuthGuard],
})
export class AppModule {}
