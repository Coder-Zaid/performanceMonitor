import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('founder', 'super_admin')
  @UseGuards(RolesGuard)
  findAll(@CurrentUser() user: any) {
    return this.userService.findAll(user.orgId);
  }

  @Get('me')
  getMe(@CurrentUser() user: any) {
    return this.userService.findOne(user.id);
  }
}
