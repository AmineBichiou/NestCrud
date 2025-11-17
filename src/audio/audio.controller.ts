import { Controller, Get } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private audioService: AudioService) {}

  @Get('play')
  play() {
    return this.audioService.startMusic();
  }
}
