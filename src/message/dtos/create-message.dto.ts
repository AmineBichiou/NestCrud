import { IsString } from 'class-validator';

export class MessageDto {
  [x: string]: string;
  @IsString()
  name: string;
  prenom: string;
}