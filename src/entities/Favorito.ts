import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';
import { Usuario } from './Usuario';
import { Local } from './Local';

@Entity()
export class Favorito extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
 usuarioid: number;

  @Column()
  localid: number;

   @ManyToOne(() => Usuario, usuario => usuario.favoritos)
   usuarios: Usuario;

    @ManyToOne(() => Local, local => local.favoritos)
   local: Local;

}