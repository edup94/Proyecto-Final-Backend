import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';

import {Post} from "./Post"
import {Usuario} from "./Usuario"
import {Favorito} from "./Favorito"

@Entity()
export class Biciusuario extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.biciusuarios)
   usuario: Usuario;

   @OneToMany(() => Post, post => post.biciusuarios)
    posts: Post[];

     @OneToMany(() => Favorito, favorito => favorito.biciusuarioid)
    favoritos: Favorito[];

}
