import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const content = await readFile('messages.json', 'utf-8').catch(() => '{}');
    const messages = JSON.parse(content || '{}');
    return messages[id];
  }

  async findAll() {
    const content = await readFile('messages.json', 'utf-8').catch(() => '{}');
    return JSON.parse(content || '{}');
  }

  async create(content: string) {
    const fileContent = await readFile('messages.json', 'utf-8').catch(() => '{}');
    const messages = JSON.parse(fileContent || '{}');

    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
    return messages[id];
  }
}
