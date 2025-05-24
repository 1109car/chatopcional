import { Injectable } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Message } from 'src/messages/entities/message.entity';
// import { Repository } from 'typeorm';


@Injectable()
export class UnificacionService {
  constructor(
    private readonly messageService: MessagesService,
  ) {}

  async createMessage(content: string, userId: number,user2id:number, roomId: number) {
    const message = this.messageService.create({ content, user: { id: userId, id2:user2id }, room: { id: roomId } });
    return message;
  }
}
