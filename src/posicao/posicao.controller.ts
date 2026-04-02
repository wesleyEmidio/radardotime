import { Controller, Get } from '@nestjs/common';
import { PosicaoService } from './posicao.service';
import { Posicao } from './entities/posicao.entity';

@Controller('posicao')
export class PosicaoController {
  constructor(private readonly posicaoService: PosicaoService) {}

  @Get('importar')
  async importar(): Promise<string> {
    return this.posicaoService.importarPosicoes();
  }

  @Get()
  async listar(): Promise<Posicao[]> {
    return this.posicaoService.listar();
  }
}
