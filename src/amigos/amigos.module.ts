import { Module } from '@nestjs/common';
import { AmigosService } from './amigos.service';
import { AmigosController } from './amigos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amigo } from './entities/amigo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Amigo])],
  controllers: [AmigosController],
  providers: [AmigosService],
  exports:[AmigosService]
})
export class AmigosModule {}
