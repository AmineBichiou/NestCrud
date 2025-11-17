import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur.repository';

@Injectable()
export class MoteurService {
  constructor(private moteurRepo: MoteurRepository) {}

  startEngine() {
    return this.moteurRepo.start();
  }

  getEngineStatus() {
    return this.moteurRepo.getStatus();
  }
}
