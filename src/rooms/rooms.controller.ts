import { Controller, Post, Body, } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

 @Post()
   create(@Body() createRoom: CreateRoomDto) {
     return this.roomsService.create(createRoom);
   }
}
