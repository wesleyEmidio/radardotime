import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Scout {
  @PrimaryColumn({ length: 5 })
  ScoutCod: string;

  @Column({ length: 100 })
  ScoutNome: string;

  @Column('decimal', { precision: 5, scale: 2 })
  ScoutValor: number;
}
