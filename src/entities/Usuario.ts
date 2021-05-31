import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import { Propietario} from "./Propietario"
import { Biciusuario } from "./Biciusuario"

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
  perfil: string;

  @OneToMany(() => Propietario, propietario => propietario.usuario)
    propietarios: Propietario[];

@OneToMany(() => Biciusuario, biciusuario => biciusuario.usuario)
    biciusuarios: Biciusuario[];
   
  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  
}