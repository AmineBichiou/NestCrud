import { Injectable } from '@nestjs/common';
import { MoteurService } from 'src/moteur/moteur.service';
import { GenerateurService } from 'src/generateur/generateur.service';
import { PhareService } from 'src/phare/phare.service';
import { AudioService } from 'src/audio/audio.service';
import { VehiculeRepository } from './vehicule.repository';

@Injectable()
export class VehiculeService {
  constructor(
    private moteur: MoteurService,
    private generateur: GenerateurService,
    private phare: PhareService,
    private audio: AudioService,
    private vehiculeRepo: VehiculeRepository,
  ) {}

  operateVehicle() {
    const engine = this.moteur.startEngine();
    const power = this.generateur.startGenerating();
    const lights = this.phare.activateLights();
    const music = this.audio.startMusic();
    const vehicle = this.vehiculeRepo.operate();

    return { engine, power, lights, music, vehicle };
  }
}
