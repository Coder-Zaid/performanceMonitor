import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { PerformanceEntryService } from './performance-entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('performance-entries')
@UseGuards(JwtAuthGuard)
export class PerformanceEntryController {
  constructor(private performanceEntryService: PerformanceEntryService) {}

  @Post()
  submit(@CurrentUser() user: any, @Body() dto: CreateEntryDto) {
    return this.performanceEntryService.submit(user.id, user.orgId, dto);
  }

  @Get('summary')
  getSummary(@CurrentUser() user: any) {
    return this.performanceEntryService.getSummary(user.id);
  }

  @Get('pending')
  getPending(@CurrentUser() user: any) {
    // Managers only see their subordinates, Founders/Admins see all in org
    const managerId = user.role === 'manager' ? user.id : undefined;
    return this.performanceEntryService.findPending(user.orgId, managerId);
  }

  @Post(':id/review')
  @Roles('founder', 'manager', 'super_admin')
  @UseGuards(RolesGuard)
  review(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { status: 'approved' | 'rejected'; notes?: string },
  ) {
    return this.performanceEntryService.reviewEntry(id, user.id, body.status, body.notes);
  }
}
