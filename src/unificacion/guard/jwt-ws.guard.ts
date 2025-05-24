import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

@Injectable()
export class JwtWsGuard  implements CanActivate {
    constructor(private readonly jwtService:JwtService){}

    async canActivate(context:ExecutionContext):Promise<boolean>{
        const client:Socket = context.switchToWs().getClient();
        const token = client.handshake.auth.token;

        if(!token){
            return false;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.JWT_SECRET,
            })
            client.data.email = payload;
            return true;
        } catch (error) {
            console.error('Error al verificar el token:', error);
            return false;
        }
    
    }
}