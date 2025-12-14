import { Controller, Post, Body, Get, Param, Put, Query, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // ----------------- Create -----------------
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('activate')
  activate(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.activate(email, password);
  }

  // ----------------- Read -----------------
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('active')
  findActive() {
    return this.userService.findActive();
  }

  @Get('inactive')
  findInactive() {
    return this.userService.findInactiveUsers();
  }

  @Get('recent')
  findRecent() {
    return this.userService.findRecentUsers();
  }

  @Get('recent/limit')
  findRecentLimit(@Query('limit') limit: string) {
    return this.userService.findRecentUsersLimit(Number(limit));
  }

  @Get('role/:role')
  findByRole(@Param('role') role: string) {
    return this.userService.findUsersByRole(role);
  }

  @Get('domain/:domain')
  findByDomain(@Param('domain') domain: string) {
    return this.userService.findUsersByDomain(domain);
  }

  @Get('date-range')
  findByDateRange(@Query('start') start: string, @Query('end') end: string) {
    return this.userService.findUsersByDateRange(new Date(start), new Date(end));
  }

  @Get('count-by-role')
  countByRole() {
    return this.userService.countUsersByRole();
  }

  @Get('average-update-time')
  averageUpdateTime() {
    return this.userService.calculateAverageTimeBetweenCreateAndUpdate();
  }

  @Get('paginated')
  paginated(@Query('page') page: string, @Query('limit') limit: string) {
    return this.userService.findPaginatedUsers(Number(page), Number(limit));
  }

  @Get('sorted')
  sorted() {
    return this.userService.findSortedUsers();
  }

  @Get('sorted/multi')
  multiSorted() {
    return this.userService.findUsersWithMultipleSorting();
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  // ----------------- Dynamic ID routes (must be last) -----------------
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ----------------- Update -----------------
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Put('update-role/:domain')
  updateRole(@Param('domain') domain: string, @Body('role') role: string) {
    return this.userService.updateUsersRoleByDomain(domain, role);
  }

  // ----------------- Delete -----------------
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('deactivate-old')
  deactivateOldAccounts() {
    return this.userService.deactivateOldAccounts();
  }
}
