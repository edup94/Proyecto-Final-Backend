import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, 
  BaseEntity, JoinTable
} from 'typeorm';
import { Usuario } from './Usuario';
import { Local } from './Local';

@Entity()
export class Post extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @Column()
  usuarioid: number;

  @Column()
localid: number;

 @ManyToOne(() => Usuario, usuario => usuario.posts)
   usuario: Usuario;

 @ManyToOne(() => Local, local => local.posts)
   local: Local;
}
