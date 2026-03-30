import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipe {
  @PrimaryGeneratedColumn({ type: 'int' })
  Equipeid: number;

  @Column({ unique: true })
  EquipeidExt: number;

  @Column({ unique: true })
  EquipeNome: string;

  @Column()
  EquipeSigla: string;

  @Column()
  EquipeEscudo: string;
}
