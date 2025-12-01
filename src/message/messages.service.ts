import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>, // This is now correct
  ) {}

  async create(content: string, status?: string) {
    const msg = this.repo.create({ content, status });
    return this.repo.save(msg);
  }

  findAll() {
    return this.repo.find();
  }
}
