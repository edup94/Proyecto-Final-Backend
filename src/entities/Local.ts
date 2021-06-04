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

  @Column()
  nombre: string;

  @Column()
  direccion: string;

   @Column()
  telefono: string;

  @Column()
  horario: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Usuario, usuario => usuario.locales)
   usuario: Usuario;

  @OneToMany(type => Post, post => post.local, {cascade: true})
    posts: Post[]; 

  @OneToMany(() => Favorito, favorito => favorito.local, {cascade: true})
    favoritos: Favorito[]; 


}