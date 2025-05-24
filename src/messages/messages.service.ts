import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';



@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message)
  private readonly messageRepository: Repository<Message>){}
  
  ObtnerIDmessageUsuario(usuarios: number) {
    return this.messageRepository.find({
      select: ['content', 'user','room','email'],
      where: { room: usuarios}, // Aseguramos que estamos comparando con room.id
  
    });
}
async obtenerMensajesDeUsuarios(user1: number, user2: number) {
  const ids = [user1, user2];

  return await this.messageRepository
    .createQueryBuilder("m")
    .innerJoinAndSelect("m.user", "u")
    .select(["m.content", "u.id", "u.name"])
    .where("u.id IN (:...ids)", { ids })
    .getRawMany();
}
  
    create(createRoom: CreateMessageDto) {
      return this.messageRepository.save(createRoom);
    }
  
}
