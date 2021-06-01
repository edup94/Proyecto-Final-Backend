import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Perfil extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

    @OneToMany(() => Usuario, usuario => usuario.perfiles)
    usuario: Usuario[];
}
