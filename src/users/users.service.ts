import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>){}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOneByEmail(email: string) {
    return  this.userRepository.findOneBy({email});
  }
  async findByEmailWithPassword(email: string){
     return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password']
     })
  }

  async findByName(name: string){
    return this.userRepository.findOne({
     where: { name },
     select: ['id', 'name', 'email', 'password']
    })
 }
  async obtenerPorID(id: number){
    return this.userRepository.findOne({
     where: { id },
     select: ['id', 'name', 'email', 'password']
    })
 }
  async todos() {
    return this.userRepository.find({
      select: ['email'],
  });
  }
  async findUserWithFriends(userId: number) {
    return this.userRepository
      .createQueryBuilder('u')
      .select(['u.name', 'u.id', 'a.friendiid'])
      .innerJoin('amigo', 'a', 'a.usuarioiid = u.id')
      .where('u.id = :userId', { userId })
      .getRawMany();
  }

}
