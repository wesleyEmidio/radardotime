import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campeonato } from './entities/campeonato.entity';
import { CampeonatoService } from './campeonato.service';
import { CampeonatoController } from './campeonato.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Campeonato])],
  controllers: [CampeonatoController],
  providers: [CampeonatoService],
})
export class CampeonatoModule {}
