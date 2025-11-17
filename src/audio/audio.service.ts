import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio.repository';

@Injectable()
export class AudioService {
  constructor(private audioRepo: AudioRepository) {}

  startMusic() {
    return this.audioRepo.playMusic();
  }
}
