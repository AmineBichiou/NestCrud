import { Controller, Get } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {
  constructor(private phareService: PhareService) {}

  @Get('on')
  turnOn() {
    return this.phareService.activateLights();
  }
}
