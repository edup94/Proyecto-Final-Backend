import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany,
  BaseEntity, JoinTable
} from 'typeorm';

import { Usuario } from './Usuario';
import { Post } from './Post';
import { Favorito } from './Favorito';

@Entity()
export class Local extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
 nombre: string;

  @Column()
  direccion: string;

   @Column()
  telefono: string;

  @Column()
usuarioid: number;

  @Column()
  horario: string;

  @ManyToOne(() => Usuario, usuario => usuario.locales)
   usuario: Usuario;

  @OneToMany(() => Post, post => post.localid)
    posts: Post[]; 

  @OneToMany(() => Favorito, favorito => favorito.localid)
    favoritos: Favorito[]; 


}