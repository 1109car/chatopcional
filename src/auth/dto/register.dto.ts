import { IsEmail, IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer"
export class RegisterDto {
    
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(5)
    name:string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    password: string;

}
