import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, 
  BaseEntity, JoinTable
} from 'typeorm';
import { Biciusuario } from './Biciusuario';

@Entity()
export class Post extends BaseEntity{

  @PrimaryGeneratedColumn()
  postid: number;

  @Column()
  biciusuarioid: number;

 @ManyToOne(() => Biciusuario, biciusuario => biciusuario.posts)
   biciusuarios: Biciusuario;
}
