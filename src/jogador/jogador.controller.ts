import { Controller, Get } from '@nestjs/common';
import { JogadorService } from './jogador.service';
import { Jogador } from './entities/jogador.entity';

@Controller('jogador')
export class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}

  @Get('importar')
  async importar(): Promise<boolean> {
    return this.jogadorService.importarJogadores();
  }

  @Get()
  async listar(): Promise<Jogador[]> {
    return this.jogadorService.listar();
  }
}
