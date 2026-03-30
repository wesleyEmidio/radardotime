import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class CreateEquipeDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  EquipeNome: string;

  @IsString({ message: 'ID Externo precisa ser um número' })
  @IsNotEmpty({ message: 'ID Externo pode estar vazio' })
  EquipeIdExt: number;

  @IsString({ message: 'Sigla precisa ser uma string' })
  @Length(3, 3, { message: 'Sigla precisa ter 3 caracteres' })
  EquipeSigla: string;

  @IsOptional() // Vai ser requerido no Next.js
  @IsUrl(
    { require_tld: false },
    { message: 'URL da imagem precisa ser uma URL válida' },
  ) // Top level domain proíbe localhost e IP
  EquipeEscudo: string;
}
