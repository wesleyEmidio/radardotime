import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampeonatoEquipe } from './entities/campeonato-equipe.entity';
import { CreateCampeonatoEquipeDto } from './dto/create-campeonatoEquipe.dto';

@Injectable()
export class CampeonatoEquipeService {
  constructor(
    @InjectRepository(CampeonatoEquipe)
    private repo: Repository<CampeonatoEquipe>,
  ) {}

  async create(dto: CreateCampeonatoEquipeDto) {
    const exists = await this.repo.findOne({
      where: {
        CampeonatoId: dto.CampeonatoId,
        EquipeId: dto.EquipeId,
      },
    });

    if (exists) {
      throw new ConflictException('Registro já existe');
    }

    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(CampeonatoId: number, EquipeId: number) {
    const item = await this.repo.findOne({
      where: { CampeonatoId, EquipeId },
    });

    if (!item) {
      throw new NotFoundException('Registro não encontrado');
    }

    return item;
  }

  async remove(CampeonatoId: number, EquipeId: number) {
    const item = await this.findOne(CampeonatoId, EquipeId);
    return this.repo.remove(item);
  }
}
