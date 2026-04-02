import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Equipe {
  @PrimaryColumn()
  EquipeId: number;

  @Column()
  EquipeNome: string;

  @Column()
  EquipeAbreviacao: string;

  @Column()
  EquipeSlug: string;

  @Column()
  EquipeApelido: string;

  @Column()
  EquipeNomeFantasia: string;

  @Column()
  EquipeUrlEditoria: string;

  @Column()
  EquipeEscudo1: string;

  @Column()
  EquipeEscudo2: string;

  @Column()
  EquipeEscudo3: string;
}
