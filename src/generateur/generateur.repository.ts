import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateurRepository {
  generatePower() {
    return 'Électricité générée';
  }
}
