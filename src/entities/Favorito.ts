import {
  Entity, PrimaryGeneratedColumn, ManyToOne,
  BaseEntity
} from 'typeorm';
import { Usuario } from './Usuario';
import { Local } from './Local';

@Entity()
export class Favorito extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

   @ManyToOne(() => Usuario, usuario => usuario.favoritos)
   usuario: Usuario;

    @ManyToOne(() => Local, local => local.favoritos, {onDelete: "CASCADE"})
   local: Local;

}