import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,
  BaseEntity
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
  horario: string;

  @ManyToOne(() => Usuario, usuario => usuario.locales)
   usuario: Usuario;

  @OneToMany(() => Post, post => post.local)
    posts: Post[]; 

  @OneToMany(() => Favorito, favorito => favorito.local)
    favoritos: Favorito[]; 


}