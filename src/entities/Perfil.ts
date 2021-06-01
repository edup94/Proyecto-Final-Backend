import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';
import { Usuario } from './Usuario';



@Entity()
export class Perfil extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

@ManyToOne(() => Perfil, perfil => perfil.id)
    perfiles: Perfil;
  

@OneToMany(() => Usuario, usuario => usuario.perfiles)
    usuario: Usuario[];

    
}
