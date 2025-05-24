import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';


@Injectable()
export class RoomsService {
   constructor(@InjectRepository(Room)
      private readonly roomRepository: Repository<Room>){}
  
    create(createRoom: CreateRoomDto) {
      return this.roomRepository.save(createRoom);
    }

    async findByEmailWithPassword(){
      return this.roomRepository.findOne({
       select: ['id']
      })
   }
   async consultaDeRoom(userUnoId: number, userDosId: number) {
    const room = await this.roomRepository
    .createQueryBuilder('room') // Alias para la tabla "room"
    .where('room.userUno = :userUnoId', { userUnoId }) // Condición para userUno
    .andWhere('room.userDos = :userDosId', { userDosId }) // Condición para userDos
    .select('room.id') // Selecciona solo el ID del room
    .getOne(); // Obtiene un solo resultado, si existe

  return room ? room.id : null; // Retorna el ID del room o null si no existe
  }
  async findPair(numA: number, numB: number) {
    const pair = this.roomRepository.findOne({
      where: [
        { userUno: numA, userDos: numB }, // Caso (1,2)
        { userUno: numB, userDos: numA }, // Caso (2,1)
      ],
      select: ['id'], // Solo seleccionamos el campo 'id'
    });
    return pair ?? null
  }
  
}
