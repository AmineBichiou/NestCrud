import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;
}