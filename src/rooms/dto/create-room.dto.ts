// import { IsString } from "class-validator";

import { IsNumber } from "class-validator";

export class CreateRoomDto {

     @IsNumber()
      userUno: number;
    
      @IsNumber()
      userDos: number;
}
