import { Module } from '@nestjs/common';
import { UnificacionService } from './unificacion.service';
import { UnificacionGateway } from './unificacion.gateway';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { MessagesModule } from 'src/messages/messages.module';
import { AmigosModule } from 'src/amigos/amigos.module';

@Module({
  imports:[UsersModule, AuthModule, RoomsModule, MessagesModule,AmigosModule],
  providers: [UnificacionGateway, UnificacionService],
})
export class UnificacionModule {}
