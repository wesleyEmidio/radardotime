import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Posicao } from './entities/posicao.entity';
import { InterfacePosicao } from './posicao-response.interface';

@Injectable()
export class PosicaoService {
  private readonly url = 'https://api.cartola.globo.com/atletas/mercado';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Posicao)
    private readonly posicaoRepository: Repository<Posicao>,
  ) {}

  async importarPosicoes(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<InterfacePosicao>(this.url),
      );

      const posicoes = response.data.posicoes;

      for (const key in posicoes) {
        const pos = posicoes[key];

        const existe = await this.posicaoRepository.findOne({
          where: { PosicaoId: pos.id },
        });

        if (!existe) {
          const novaPosicao = this.posicaoRepository.create({
            PosicaoId: pos.id,
            PosicaoNome: pos.nome,
            PosicaoAbrev: pos.abreviacao,
          });

          await this.posicaoRepository.save(novaPosicao);
        }
      }

      return 'Importação de Posições criada com sucesso';
    } catch (error: unknown) {
      return 'Erro na importação: ' + String(error);
    }
  }

  async listar(): Promise<Posicao[]> {
    return this.posicaoRepository.find();
  }
}
