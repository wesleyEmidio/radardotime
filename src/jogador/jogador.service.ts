import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { Jogador } from './entities/jogador.entity';
import { InterfaceJogador } from './jogador-response.interface';

// 🔥 reaproveitando sua interface
type Atleta = InterfaceJogador['atletas'][string];

@Injectable()
export class JogadorService {
  private readonly logger = new Logger(JogadorService.name);
  private readonly url = 'https://api.cartola.globo.com/atletas/mercado';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Jogador)
    private readonly jogadorRepository: Repository<Jogador>,
  ) {}

  // =========================
  // MÉTODO PRINCIPAL
  // =========================
  async importarJogadores(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<InterfaceJogador>(this.url),
      );

      const atletas = response.data.atletas;

      for (const key in atletas) {
        const atleta = atletas[key];
        await this.processarAtleta(atleta);
      }

      this.logger.log('Importação finalizada com sucesso');
      return true;
    } catch (error) {
      this.logger.error('Erro ao importar jogadores', error);
      return false;
    }
  }

  // =========================
  // PROCESSAR ATLETA
  // =========================
  private async processarAtleta(atleta: Atleta): Promise<void> {
    const jogadorExistente = await this.jogadorRepository.findOneBy({
      JogadorId: Number(atleta.atleta_id),
    });

    if (jogadorExistente) {
      await this.atualizarJogador(jogadorExistente, atleta);
    } else {
      await this.criarJogador(atleta);
    }
  }

  // =========================
  // UPDATE
  // =========================
  private async atualizarJogador(
    jogador: Jogador,
    atleta: Atleta,
  ): Promise<void> {
    // Mudança de clube
    if (jogador.EquipeId !== atleta.clube_id) {
      this.logMudancaJogador(jogador, atleta);

      jogador.EquipeId = atleta.clube_id;

      // Regra técnico
      if (atleta.posicao_id === 6) {
        await this.demitirTecnico(atleta.clube_id);
      }
    }

    // Atualização de dados
    jogador.JogadorNome = atleta.nome;
    jogador.JogadorSlug = atleta.slug;
    jogador.JogadorApelido = atleta.apelido;
    jogador.JogadorApelidoAbreviado = atleta.apelido_abreviado;
    jogador.JogadorFoto = this.formatarFoto(atleta.foto);
    jogador.PosicaoId = atleta.posicao_id;

    await this.jogadorRepository.save(jogador);
  }

  // =========================
  // INSERT
  // =========================
  private async criarJogador(atleta: Atleta): Promise<void> {
    // Regra técnico
    if (atleta.posicao_id === 6) {
      await this.demitirTecnico(atleta.clube_id);
    }

    const novo = this.jogadorRepository.create({
      JogadorId: atleta.atleta_id,
      JogadorNome: atleta.nome,
      JogadorSlug: atleta.slug,
      JogadorApelido: atleta.apelido,
      JogadorApelidoAbreviado: atleta.apelido_abreviado,
      JogadorFoto: this.formatarFoto(atleta.foto),
      PosicaoId: atleta.posicao_id,
      EquipeId: atleta.clube_id,
    });

    await this.jogadorRepository.save(novo);

    this.logNovoJogador(atleta);
  }

  // =========================
  // SUB: DEMITIR TECNICO
  // =========================
  private async demitirTecnico(clubeId: number): Promise<void> {
    const tecnicos = await this.jogadorRepository.find({
      where: {
        EquipeId: clubeId,
        PosicaoId: 6,
      },
    });

    for (const tecnico of tecnicos) {
      tecnico.EquipeId = null;

      await this.jogadorRepository.save(tecnico);

      this.logger.warn(
        `Tecnico ${tecnico.JogadorApelido} demitido do clube ${clubeId}`,
      );
    }
  }

  // =========================
  // LOGS
  // =========================
  private logMudancaJogador(jogador: Jogador, atleta: Atleta) {
    const msg = `
MUDANÇA JOGADOR: ${atleta.nome} (${atleta.apelido})
Posição: ${atleta.posicao_id}
TROCOU: ${jogador.EquipeId} POR ${atleta.clube_id}
`;

    this.logger.log(this.removerAcentos(msg));
  }

  private logNovoJogador(atleta: Atleta) {
    let msg = '';

    if (atleta.posicao_id === 6) {
      msg = `NOVO TECNICO: ${atleta.nome} (${atleta.apelido}) - Clube: ${atleta.clube_id}`;
    } else {
      msg = `NOVO JOGADOR: ${atleta.nome} (${atleta.apelido}) - Posição: ${atleta.posicao_id} - Clube: ${atleta.clube_id}`;
    }

    this.logger.log(this.removerAcentos(msg));
  }

  // =========================
  // HELPERS
  // =========================
  private formatarFoto(foto: string): string {
    return foto?.replace('FORMATO', '220x220');
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // =========================
  // LISTAR
  // =========================
  async listar(): Promise<Jogador[]> {
    return this.jogadorRepository.find();
  }
}
