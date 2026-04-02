import { IsNumber } from 'class-validator';

export class CreateCampeonatoEquipeDto {
  @IsNumber()
  CampeonatoId: number;

  @IsNumber()
  EquipeId: number;
}
