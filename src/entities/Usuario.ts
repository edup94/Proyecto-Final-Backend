import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';


import { Perfil } from "./Perfil"
import { Favorito } from "./Favorito"
import { Local } from "./Local"
import { Post } from "./Post"

@Entity()
export class Usuario extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  nombre: string;
  
  @Column()
  apellido: string;

  @Column({unique: true})
  email: string;

  @Column()
  contrasena: string;

  @Column()
  perfil: number;

  @ManyToOne(() => Perfil, perfil => perfil.id)
    perfiles: Perfil;

  @OneToMany(() => Favorito, favorito => favorito.usuarioid)
    favoritos: Favorito[];

  @OneToMany(() => Local, local => local.usuarioid)
    locales: Local[];

  @OneToMany(() => Post, post => post.usuarioid)
    posts: Post[]; 


  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  
}