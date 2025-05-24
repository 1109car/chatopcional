//  import { Room } from "src/rooms/entities/room.entity";
// import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // @ManyToOne(() => User, (user) => user.messages)
  @Column()
  user: string;
  @Column()
  email: string;
  @Column()

  room: number;
}
