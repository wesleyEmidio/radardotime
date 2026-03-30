import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PosicaoService } from './posicao.service';
import { CreatePosicaoDto } from './dto/create-posicao.dto';
import { UpdatePosicaoDto } from './dto/update-posicao.dto';
import { Posicao } from './entities/posicao.entity';

@Controller('posicao')
export class PosicaoController {
  constructor(private readonly posicaoService: PosicaoService) {}

  @Post()
  async create(@Body() dto: CreatePosicaoDto) {
    const user = await this.posicaoService.create(dto);
    return user;
  }
}
