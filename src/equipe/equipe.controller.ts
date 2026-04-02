import { Controller, Get } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { Equipe } from './entities/equipe.entity';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Get('importar')
  async importar(): Promise<boolean> {
    return this.equipeService.importarEquipes();
  }

  @Get()
  async listar(): Promise<Equipe[]> {
    return this.equipeService.listar();
  }
}
