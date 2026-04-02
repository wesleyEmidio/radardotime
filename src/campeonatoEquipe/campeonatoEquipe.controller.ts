import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CampeonatoEquipeService } from './campeonatoEquipe.service';
import { CreateCampeonatoEquipeDto } from './dto/create-campeonatoEquipe.dto';

@Controller('campeonato-equipe')
export class CampeonatoEquipeController {
  constructor(private readonly service: CampeonatoEquipeService) {}

  @Post()
  create(@Body() dto: CreateCampeonatoEquipeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':campeonatoId/:equipeId')
  findOne(
    @Param('campeonatoId') campeonatoId: number,
    @Param('equipeId') equipeId: number,
  ) {
    return this.service.findOne(Number(campeonatoId), Number(equipeId));
  }

  @Delete(':campeonatoId/:equipeId')
  remove(
    @Param('campeonatoId') campeonatoId: number,
    @Param('equipeId') equipeId: number,
  ) {
    return this.service.remove(Number(campeonatoId), Number(equipeId));
  }
}
