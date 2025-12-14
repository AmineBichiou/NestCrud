import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserFilterInterceptor } from '../interceptors/user-filter.interceptor';
import { UsersService } from './users.service';

@UseInterceptors(UserFilterInterceptor)
@Controller('admin/users')
export class AdminUserController {
  constructor(private userService: UsersService) {}
@Get()
  findAll() {
    return this.userService.findAll();
  }
}
