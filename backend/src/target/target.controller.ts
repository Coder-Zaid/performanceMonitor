import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TargetService } from './target.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';

@Controller('targets')
@UseGuards(ClerkAuthGuard)
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Get('tasks')
  async getTasks(@Req() req) {
    const { id, role, orgId } = req.user;
    return this.targetService.getTasks(id, role, orgId);
  }

  @Post('tasks')
  async createTask(
    @Req() req,
    @Body() body: { employeeId: string; title: string; description?: string; dueDate: string },
  ) {
    const { id: managerId, orgId } = req.user;
    return this.targetService.createTask(
      orgId,
      managerId,
      body.employeeId,
      body.title,
      body.description || '',
      body.dueDate,
    );
  }

  @Patch('tasks/:id/status')
  async updateTaskStatus(
    @Req() req,
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    const { orgId } = req.user;
    return this.targetService.updateTaskStatus(id, body.status, orgId);
  }
}
