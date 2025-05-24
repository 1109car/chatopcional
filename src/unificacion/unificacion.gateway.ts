import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,

} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
 import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
   import { MessagesService } from 'src/messages/messages.service';
 import { Room } from 'src/rooms/entities/room.entity';
import { Message } from 'src/messages/entities/message.entity';

 import { AmigosService } from 'src/amigos/amigos.service';
 import { Amigo } from 'src/amigos/entities/amigo.entity';
import { UseGuards } from '@nestjs/common';
import { JwtWsGuard } from './guard/jwt-ws.guard';






@WebSocketGateway( {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
 @UseGuards(JwtWsGuard)
export class UnificacionGateway {
  constructor(
        //  private readonly socketsService: UnificacionService,
          private readonly roomService: RoomsService,
          private readonly userService: UsersService,
          private readonly messageService: MessagesService,
          private readonly amigoService: AmigosService
     
        ) {}
        private connectedUsers = new Map<string, string>(); // socket.id -> userId
        private userSockets = new Map<string, string>(); // userId -> socket.id
        
        @WebSocketServer()
          server: Server;

          handleConnection(client: Socket) {
            console.log('✅ Cliente conectado:', client.id);
          }
        
          handleDisconnect(client: Socket) {
            console.log('❌ Cliente desconectado:', client.id);
          }
          @SubscribeMessage('usuarioLogeado')
          async handleUserLogin() {
            
          }

      @SubscribeMessage('get_usuarios')
     async  sendData(@ConnectedSocket() socket: Socket,@MessageBody() friedn: {friendiid:string}): Promise<void> {
    try {
      const usuarios = await this.userService.todos();
     await socket.emit('usuarios',usuarios );
 
     const user1 = await this.userService.findByEmailWithPassword(socket.data.email.email);
    const user2 = await this.userService.findByEmailWithPassword(friedn.friendiid);
    console.log(user1.id)
    console.log(user2.id)
      const result = await this.amigoService.findOne(user1.id, user2.id);
     if (!result) {
          const amigo = new Amigo()
         amigo.usuarioiid = user1.id
         amigo.friendiid = user2.id
          this.amigoService.create(amigo)
              // await socket.emit('amigos_mostrar',amigo.id)
      }
    
    } catch (error) {
      console.log(error)
    }
  }
  @SubscribeMessage('amigos_register')
  async friends(@ConnectedSocket() socket:Socket):Promise<void>{
    
    try {
      const usuariosEmail = await this.userService.findByEmailWithPassword(socket.data.email.email);
         const user1 = await this.userService.findUserWithFriends(usuariosEmail.id);
         console.log(user1[0].u_id)
        for (const item of user1) {
          const result = await this.userService.obtenerPorID(item.a_friendiid);
          console.log(result);
          socket.emit('amigos_mostrar', {name:result.email});
        }
      //  console.log(user1.id)
   
    } catch (error) { 
      console.log(error.message)
    }
 }

  @SubscribeMessage('mensajeUser')
  async ingres(@ConnectedSocket() socket:Socket,@MessageBody() rt:{userDos:string}):Promise<void>
  {
    
   console.log(rt.userDos)
          try {
            const usuariosEmail = await this.userService.findByEmailWithPassword(socket.data.email.email);
            console.log({...usuariosEmail}.id)
     
              // socket.emit('IdUser1', usuariosLoegado.id)
           
              const usuarios2Email = await this.userService.findByEmailWithPassword(rt.userDos);
              console.log({...usuarios2Email}.id)
       
            // this.connectedUsers.set(socket.id, usuariosLoegado.id.toString());
            // this.userSockets.set(usuariosLoegado.id.toString(), socket.id);
            
            
            const {...verify} = await this.roomService.findPair({...usuariosEmail}.id,{...usuarios2Email}.id)
            // console.log(verify.id+ "id del room")
            console.log(verify)
            console.log(verify.id+ "id del room"+typeof verify.id)
              console.log(verify.id)
            if ( verify == null) {
              const room = new Room();
              room.userUno = {...usuariosEmail}.id;  
              room.userDos = {...usuarios2Email}.id;
              await this.roomService.create(room);
              // await socket.emit('serverRoom',room.id)

            }else{
              const mostrarRela=  await this.messageService.ObtnerIDmessageUsuario(verify.id)
              console.log(mostrarRela)
              this.server.emit("mostrarMensaje",mostrarRela)
              console.log(mostrarRela)
              await socket.emit('serverRoom',verify.id)
              console.log(verify.id)
            }
          }
        catch(e){console.log("error "+ e)}
   
  }
 
 
  @SubscribeMessage('mensajon')
  async MnesajesLLeg(@ConnectedSocket() socket:Socket,@MessageBody() rt:{room:number,message:string}):Promise<void>
  {
    console.log( rt.room, rt.message + "esto es el mensaje")

    const usuariosEmail = await this.userService.findByEmailWithPassword(socket.data.email.email);
            console.log({...usuariosEmail})
            console.log(rt.room)
            
                  
              const mensajes =new Message()
              mensajes.content = rt.message
              mensajes.user ={...usuariosEmail}.name
              mensajes.email ={...usuariosEmail}.email
              //  mensajes.userEmail = {...usuariosEmail}.email
              mensajes.room = Number(rt.room)
              await this.messageService.create(mensajes)
              this.server.emit("mensajeNuevo",mensajes)
            

  } 
}