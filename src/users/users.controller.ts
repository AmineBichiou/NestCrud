import { Controller, Post, Body, Get, Param, Put, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @Put('activate')
  activate(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.userService.activate(email, password);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
  @Get('active')
  findActive() {
    return this.userService.findActive();
  }

  // ----------- UPDATE PARTIAL -----------
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  // ----------- REMOVE -----------
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
}
