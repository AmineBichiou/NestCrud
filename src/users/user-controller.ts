import { Controller, Get, Post, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ----------------- Create -----------------
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Post('activate')
  async activate(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.activate(body.email, body.password);
    if (!user) throw new NotFoundException('Invalid email or password');
    return user;
  }

  @Post('deactivate-old')
  async deactivateOldAccounts() {
    await this.usersService.deactivateOldAccounts();
    return { message: 'Old accounts deactivated' };
  }

  // ----------------- Read -----------------
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('active')
  async findActive(): Promise<User[]> {
    return this.usersService.findActive();
  }

  @Get('inactive')
  async findInactive(): Promise<User[]> {
    return this.usersService.findInactiveUsers();
  }

  @Get('recent')
  async findRecent() {
    return this.usersService.findRecentUsers();
  }

  @Get('recent/limit')
  async findRecentLimit(@Query('limit') limit: string) {
    return this.usersService.findRecentUsersLimit(Number(limit));
  }

  @Get('role/:role')
  async findByRole(@Param('role') role: string) {
    return this.usersService.findUsersByRole(role);
  }

  @Get('domain/:domain')
  async findByDomain(@Param('domain') domain: string) {
    return this.usersService.findUsersByDomain(domain);
  }

  @Get('date-range')
  async findByDateRange(@Query('start') start: string, @Query('end') end: string) {
    return this.usersService.findUsersByDateRange(new Date(start), new Date(end));
  }

  @Get('count-by-role')
  async countByRole() {
    return this.usersService.countUsersByRole();
  }

  @Get('average-update-time')
  async averageUpdateTime() {
    return this.usersService.calculateAverageTimeBetweenCreateAndUpdate();
  }

  @Get('paginated')
  async paginated(@Query('page') page: string, @Query('limit') limit: string) {
    return this.usersService.findPaginatedUsers(Number(page), Number(limit));
  }

  @Get('sorted')
  async sorted() {
    return this.usersService.findSortedUsers();
  }

  @Get('sorted/multi')
  async multiSorted() {
    return this.usersService.findUsersWithMultipleSorting();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  // ----------------- Update -----------------
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Put('update-role/:domain')
  async updateRole(@Param('domain') domain: string, @Body('role') role: string) {
    return this.usersService.updateUsersRoleByDomain(domain, role);
  }

  // ----------------- Delete -----------------
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
