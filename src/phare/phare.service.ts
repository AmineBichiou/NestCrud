import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare.repository';

@Injectable()
export class PhareService {
  constructor(private phareRepo: PhareRepository) {}

  activateLights() {
    return this.phareRepo.turnOn();
  }
}
