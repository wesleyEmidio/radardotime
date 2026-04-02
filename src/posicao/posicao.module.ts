import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posicao } from './entities/posicao.entity';
import { HttpModule } from '@nestjs/axios';
import { PosicaoService } from './posicao.service';
import { PosicaoController } from './posicao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Posicao]), HttpModule],
  providers: [PosicaoService],
  controllers: [PosicaoController],
})
export class PosicaoModule {}
