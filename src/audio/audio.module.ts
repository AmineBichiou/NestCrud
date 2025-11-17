import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioRepository } from './audio.repository';
import { AudioController } from './audio.controller';
@Module({
  providers: [AudioService, AudioRepository],
  controllers: [AudioController],
  exports: [AudioService],
})
export class AudioModule {}
