import { Injectable } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipe } from './entities/equipe.entity';

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(Equipe)
    private readonly equipeRepository: Repository<Equipe>,
  ) {}

  async create(equipe: Partial<Equipe>) {
    return this.equipeRepository.save(equipe);
  }

  async findByAbreviacao(abreviacao: string) {
    return this.equipeRepository.findOne({
      where: { EquipeSigla: abreviacao },
    });
  }
}
