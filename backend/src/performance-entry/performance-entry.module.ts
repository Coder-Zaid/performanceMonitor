import { Module } from '@nestjs/common';
import { PerformanceEntryService } from './performance-entry.service';
import { PerformanceEntryController } from './performance-entry.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [PerformanceEntryService],
  controllers: [PerformanceEntryController],
  exports: [PerformanceEntryService],
})
export class PerformanceEntryModule {}
