import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1) Récupérer tous les utilisateurs, optionnellement filtrer via ?status=active
  @Get()
  getAll(@Query('status') status?: string) {
    return this.usersService.findAll(status);
  }

  // 6) Route spéciale: /users/active/:status -> les utilisateurs avec ce statut
  @Get('active/:status')
  getActiveByParam(@Param('status') status: string) {
    return this.usersService.findActiveByStatus(status);
  }

  // 2) Récupérer un utilisateur par id
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  // 3) Créer un nouvel utilisateur. Exemple d'utilisation de @Headers
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') authorization?: string, // exemple d'en-tête
  ) {
    // authorization peut être undefined si non fourni — ici on le passe au service
    return this.usersService.create(createUserDto, authorization);
  }

  // 4) Mettre à jour un utilisateur existant
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // 5) Supprimer un utilisateur
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.usersService.remove(id);
    // 204 No Content
  }
}
