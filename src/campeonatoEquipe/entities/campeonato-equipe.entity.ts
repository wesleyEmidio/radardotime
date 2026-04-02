import { Campeonato } from 'src/campeonato/entities/campeonato.entity';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'CampeonatoEquipe' })
export class CampeonatoEquipe {
  @PrimaryColumn({ type: 'decimal' })
  CampeonatoId: number;

  @PrimaryColumn({ type: 'decimal' })
  EquipeId: number;

  @ManyToOne(() => Campeonato, { eager: true })
  @JoinColumn({ name: 'CampeonatoId' })
  campeonato: Campeonato;

  @ManyToOne(() => Equipe, { eager: true })
  @JoinColumn({ name: 'EquipeId' })
  equipe: Equipe;
}
