import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('departments')
@UseGuards(ClerkAuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.departmentService.findAll(user.orgId);
  }

  @Post()
  create(@CurrentUser() user: any, @Body() data: any) {
    return this.departmentService.create(user.orgId, data);
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() data: any) {
    return this.departmentService.update(id, user.orgId, data);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.departmentService.remove(id, user.orgId);
  }
}
