import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePosicaoDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  PosicaoNome: string;
}
