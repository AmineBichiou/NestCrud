import { Controller, Get } from '@nestjs/common';
import { GenerateurService } from './generateur.service';

@Controller('generateur')
export class GenerateurController {
  constructor(private generateurService: GenerateurService) {}

  @Get('generate')
  generate() {
    return this.generateurService.startGenerating();
  }
}
