import { Injectable } from '@nestjs/common';

@Injectable()
export class VehiculeRepository {
  operate() {
    return 'Véhicule en fonctionnement';
  }
}
