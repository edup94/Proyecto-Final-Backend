import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';
import { Propietario } from './Propietario';

@Entity()
export class Local extends BaseEntity{

  @PrimaryGeneratedColumn()
  localid: number;

  @Column({unique: true})
 nombre: string;

  @Column()
  direccion: string;

   @Column()
  telefono: string;

  @Column()
  horario: string;

  @ManyToOne(() => Propietario, propietario => propietario.locales)
   propietario: Propietario;
}