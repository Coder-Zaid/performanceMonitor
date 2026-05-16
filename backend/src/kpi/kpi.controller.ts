import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('kpis')
@UseGuards(ClerkAuthGuard)
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.kpiService.findAll(user.orgId);
  }

  @Get('my')
  getMyKpis(@CurrentUser() user: any) {
    return this.kpiService.findForUser(user.id, user.orgId);
  }

  @Post()
  create(@CurrentUser() user: any, @Body() data: any) {
    return this.kpiService.create(user.orgId, data);
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() data: any) {
    return this.kpiService.update(id, user.orgId, data);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.kpiService.remove(id, user.orgId);
  }
}
