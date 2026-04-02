import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampeonatoEquipe } from './entities/campeonato-equipe.entity';
import { CampeonatoEquipeController } from './campeonatoEquipe.controller';
import { CampeonatoEquipeService } from './campeonatoEquipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampeonatoEquipe])],
  controllers: [CampeonatoEquipeController],
  providers: [CampeonatoEquipeService],
})
export class CampeonatoEquipeModule {}
