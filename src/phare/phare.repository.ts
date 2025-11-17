import { Injectable } from '@nestjs/common';

@Injectable()
export class PhareRepository {
  turnOn() {
    return 'Phares allumés';
  }
}
