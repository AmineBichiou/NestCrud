import { Injectable } from '@nestjs/common';

@Injectable()
export class MoteurRepository {
  private status = 'off';

  start() {
    this.status = 'running';
    return 'Moteur démarré';
  }

  getStatus() {
    return this.status;
  }
}
