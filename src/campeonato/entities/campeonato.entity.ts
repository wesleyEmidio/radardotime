import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Campeonato' })
export class Campeonato {
  @PrimaryGeneratedColumn({ type: 'int' })
  CampeonatoId: number;

  @Column({ length: 60 })
  CampeonatoNome: string;

  @Column({ length: 40 })
  CampeonatoAbrev: string;

  @Column({ type: 'smallint' })
  CampeonatoAno: number;
}
