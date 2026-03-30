import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posicao {
  @PrimaryGeneratedColumn({ type: 'int' })
  Posicaoid: number;

  @Column({ unique: true })
  PosicaoNome: string;
}
