import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCampeonatoDto {
  @IsString()
  @IsNotEmpty()
  CampeonatoNome: string;

  @IsString()
  @IsNotEmpty()
  CampeonatoAbrev: string;

  @IsNumber()
  CampeonatoAno: number;
}
