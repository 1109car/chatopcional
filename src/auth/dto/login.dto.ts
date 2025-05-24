import { IsEmail, IsString, MinLength} from "class-validator"
import { Transform } from "class-transformer"
export class LoginDto  {
    @IsEmail()
    @Transform(({value}) => value.trim())
    email: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(6)
    password:string
}
