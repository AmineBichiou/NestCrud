import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) { }

  @Get()
  getMessages() {
    return this.service.findAll();
  }

  @Post()
  createMessage(@Body() message: MessageDto) {
    return this.service.create(message.content, message.status);
  }


}