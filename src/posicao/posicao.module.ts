import { Module } from '@nestjs/common';
import { PosicaoService } from './posicao.service';
import { PosicaoController } from './posicao.controller';
import { Posicao } from './entities/posicao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Posicao])],
  providers: [PosicaoService],
  controllers: [PosicaoController],
  exports: [PosicaoService],
})
export class PosicaoModule {}
