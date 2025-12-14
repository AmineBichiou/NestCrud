import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'L’adresse e-mail doit être valide (ex: name@example.com).' })
  @IsNotEmpty({ message: 'Le champ email est obligatoire.' })
  email: string;

  @IsString({ message: 'Le password doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le champ password est obligatoire.' })
  password: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
