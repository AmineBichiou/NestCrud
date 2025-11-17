import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur.repository';

@Injectable()
export class GenerateurService {
  constructor(private generateurRepo: GenerateurRepository) {}

  startGenerating() {
    return this.generateurRepo.generatePower();
  }
}
