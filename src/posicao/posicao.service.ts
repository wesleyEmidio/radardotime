import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePosicaoDto } from './dto/create-posicao.dto';
import { UpdatePosicaoDto } from './dto/update-posicao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posicao } from './entities/posicao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PosicaoService {
  constructor(
    @InjectRepository(Posicao)
    private readonly posicaoRepository: Repository<Posicao>,
  ) {}

  async create(dto: CreatePosicaoDto) {
    await this.verificaPosicaoExistente(dto.PosicaoNome);

    const NovoRegistro: CreatePosicaoDto = {
      PosicaoNome: dto.PosicaoNome,
    };

    return this.posicaoRepository.save(NovoRegistro);
  }

  async verificaPosicaoExistente(posicaoNome: string) {
    const exists = await this.posicaoRepository.existsBy({
      PosicaoNome: posicaoNome,
    });

    if (exists) {
      throw new ConflictException(
        'Posição: ' + posicaoNome + ' já cadastrado.',
      );
    }
  }
}
