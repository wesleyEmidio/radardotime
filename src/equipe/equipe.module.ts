import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Equipe } from './entities/equipe.entity';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe]), HttpModule],
  providers: [EquipeService],
  controllers: [EquipeController],
})
export class EquipeModule {}
