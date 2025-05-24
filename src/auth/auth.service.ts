import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from "@nestjs/jwt"
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {


  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}
  async create({name, email, password}: RegisterDto) {
    const user = await this.userService.findOneByEmail(email)
    if (user) throw new BadRequestException('Email already exists');

    await this.userService.create({ name, email, password: await bcryptjs.hash(password, 10) })

    return {
      name,
      email
    };
  }

  async login({email, password}: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email)
    if (!user) throw new UnauthorizedException('Email no existe')

    const isPassworValidd = await bcryptjs.compare(password, user.password)

    if (!isPassworValidd) throw new UnauthorizedException('contraseña no existe')
      
    
    const payload = { email:user.email}
    
    const token = await this.jwtService.signAsync(payload)

    return { token, email}
  }

}
