import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScoutDto {
  @IsString()
  @IsNotEmpty()
  ScoutCod: string;

  @IsString()
  @IsNotEmpty()
  ScoutNome: string;

  @IsNumber()
  ScoutValor: number;
}
