import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Posicao {
  @PrimaryColumn()
  PosicaoId: number;

  @Column()
  PosicaoNome: string;

  @Column()
  PosicaoAbrev: string;
}
