import { Module } from '@nestjs/common';
import { GenerateurService } from './generateur.service';
import { GenerateurRepository } from './generateur.repository';
import { GenerateurController } from './generateur.controller';

@Module({
  providers: [GenerateurService, GenerateurRepository],
  controllers: [GenerateurController],
  exports: [GenerateurService],
})
export class GenerateurModule {}
