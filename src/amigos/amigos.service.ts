import { Injectable } from '@nestjs/common';
import { CreateAmigoDto } from './dto/create-amigo.dto';
// import { UpdateAmigoDto } from './dto/update-amigo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Amigo } from './entities/amigo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AmigosService {

  constructor(@InjectRepository(Amigo) 
  private readonly amigosRepository: Repository<Amigo>){}
  create(createAmigoDto: CreateAmigoDto) {
    return this.amigosRepository.save(createAmigoDto);
  }

  findAll() {
    return this.amigosRepository.find();
  }

  
  
 async findOne(idUser: number,idUserDOs:number) {
    return this.amigosRepository.findOne({
      where: [
        { usuarioiid: idUser, friendiid: idUserDOs }, // Caso (1,2)
      
      ],
      select: ['id'], // Solo seleccionamos el campo 'id'
    });
  
  }

  // update(id: number, updateAmigoDto: UpdateAmigoDto) {
  //   return `This action updates a #${id} amigo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} amigo`;
  // }
}
