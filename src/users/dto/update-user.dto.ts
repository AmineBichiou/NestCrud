import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// UpdateUserDto = toutes les propriétés du CreateUserDto en optionnel
export class UpdateUserDto extends PartialType(CreateUserDto) {}
