import { Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeRepository } from './vehicule.repository';
import { VehiculeController } from './vehicule.controller';
import { MoteurModule } from 'src/moteur/moteur.module';
import { GenerateurModule } from 'src/generateur/generateur.module';
import { PhareModule } from 'src/phare/phare.module';
import { AudioModule } from 'src/audio/audio.module';

@Module({
  imports: [MoteurModule, GenerateurModule, PhareModule, AudioModule],
  providers: [VehiculeService, VehiculeRepository],
  controllers: [VehiculeController],
})
export class VehiculeModule {}
