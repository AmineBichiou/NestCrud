import { Controller, Get } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {
  constructor(private moteurService: MoteurService) {}

  @Get('start')
  start() {
    return this.moteurService.startEngine();
  }

  @Get('status')
  status() {
    return this.moteurService.getEngineStatus();
  }
}
