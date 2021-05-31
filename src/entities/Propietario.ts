import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';

import { Local } from "./Local"
import { Usuario } from './Usuario';

@Entity()
export class Propietario extends BaseEntity{

  @PrimaryGeneratedColumn()
  propietarioid: number;

   @ManyToOne(() => Usuario, usuario => usuario.propietarios)
   usuario: Usuario;

   @OneToMany(() => Local, local => local.propietario)
   locales: Local[];

 //  @OneToMany(() => Locales, locales => locales.localid)
 //   favoriteslocales: Locales[];

}