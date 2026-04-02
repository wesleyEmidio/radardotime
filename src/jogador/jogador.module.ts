import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Jogador } from './entities/jogador.entity';
import { JogadorService } from './jogador.service';
import { JogadorController } from './jogador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Jogador]), HttpModule],
  providers: [JogadorService],
  controllers: [JogadorController],
})
export class JogadorModule {}
