import { Message } from "src/messages/entities/message.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userUno: number;
  
    @Column()
    userDos: number;
  
    @OneToMany(() => Message, (message) => message.room)
    messages: Message[];
}
