import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';
import { UnificacionModule } from './unificacion/unificacion.module';
import { AmigosModule } from './amigos/amigos.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "shinkansen.proxy.rlwy.net",
      port: 38039,
      username: "root",
      password: "DaPwSFXTdtybrPPJjMSqFmLGvKhXAoBM",
      database: "railway",
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    MessagesModule,
    RoomsModule,
    UnificacionModule,
    AmigosModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
