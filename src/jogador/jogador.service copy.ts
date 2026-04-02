import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Jogador } from './entities/jogador.entity';
import { InterfaceJogador } from './jogador-response.interface';

@Injectable()
export class JogadorService {
  private readonly url = 'https://api.cartola.globo.com/atletas/mercado';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Jogador)
    private readonly jogadorRepository: Repository<Jogador>,
  ) {}

  async importarJogadores(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<InterfaceJogador>(this.url),
      );

      const atletas = response.data.atletas;

      for (const key in atletas) {
        const atleta = atletas[key];

        const existe = await this.jogadorRepository.findOne({
          where: { JogadorId: atleta.atleta_id },
        });

        if (!existe) {
          const novoJogador = this.jogadorRepository.create({
            JogadorId: atleta.atleta_id,
            JogadorNome: atleta.nome,
            JogadorSlug: atleta.slug,
            JogadorApelido: atleta.apelido,
            JogadorApelidoAbreviado: atleta.apelido_abreviado,
            JogadorFoto: atleta.foto,
            EquipeId: atleta.clube_id,
            PosicaoId: atleta.posicao_id,
          });

          await this.jogadorRepository.save(novoJogador);
        }
      }

      return true;
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }

  async listar(): Promise<Jogador[]> {
    return this.jogadorRepository.find();
  }
}
