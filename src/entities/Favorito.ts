import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';
import { Biciusuario } from './Biciusuario';



@Entity()
export class Favorito extends BaseEntity{
  @PrimaryGeneratedColumn()
  favoritoid: number;

  @Column()
 biciusuarioid: string;

  @Column()
  localid: string;

   @ManyToOne(() => Biciusuario, biciusuario => biciusuario.favoritos)
   biciusuarios: Biciusuario;
}