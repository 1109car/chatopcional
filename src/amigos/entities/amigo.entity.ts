// import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Amigo {
     @PrimaryGeneratedColumn()
    id: number
    @Column()
    usuarioiid: number

    // @ManyToOne(() => User, (usuario) => usuario.id, {
    //     onDelete: 'CASCADE',
    //   })
    @Column()
      friendiid: number;

}
