import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,
  BaseEntity
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

  @ManyToOne(() => Perfil, perfil => perfil.usuario)
    perfiles: Perfil;

  @OneToMany(() => Favorito, favorito => favorito.usuario)
    favoritos: Favorito[];

  @OneToMany(() => Local, local => local.usuario)
    locales: Local[];

  @OneToMany(type => Post, post => post.usuario)
    posts: Post[]; 
}