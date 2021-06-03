import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
  BaseEntity
} from 'typeorm';
import { Usuario } from './Usuario';
import { Local } from './Local';

@Entity()
export class Post extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

 @ManyToOne(type => Usuario, usuario => usuario.posts)
   usuario: Usuario;

 @ManyToOne(type => Local, local => local.posts)
   local: Local;
}
