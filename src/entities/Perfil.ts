import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne,
  BaseEntity, JoinTable
} from 'typeorm';



@Entity()
export class Perfil extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  /*
  @ManyToOne(() => Usuario, usuario => usuario.biciusuarios)
   usuario: Usuario;

   @OneToMany(() => Post, post => post.biciusuarios)
    posts: Post[];

     @OneToMany(() => Favorito, favorito => favorito.biciusuarioid)
    favoritos: Favorito[];
   */
}
