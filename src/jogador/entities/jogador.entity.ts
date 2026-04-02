import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Jogador {
  @PrimaryColumn()
  JogadorId: number;

  @Column()
  JogadorNome: string;

  @Column()
  JogadorSlug: string;

  @Column()
  JogadorApelido: string;

  @Column()
  JogadorApelidoAbreviado: string;

  @Column()
  JogadorFoto: string;

  @Column({ type: 'int', nullable: true })
  EquipeId: number | null;

  @Column()
  PosicaoId: number;
}
