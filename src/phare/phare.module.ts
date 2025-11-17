import { Module } from '@nestjs/common';
import { PhareService } from './phare.service';
import { PhareRepository } from './phare.repository';
import { PhareController } from './phare.controller';

@Module({
  providers: [PhareService, PhareRepository],
  controllers: [PhareController],
  exports: [PhareService],
})
export class PhareModule {}
