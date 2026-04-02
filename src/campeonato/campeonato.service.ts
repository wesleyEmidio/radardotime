import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';
import { Campeonato } from './entities/campeonato.entity';

@Injectable()
export class CampeonatoService {
  constructor(
    @InjectRepository(Campeonato)
    private repo: Repository<Campeonato>,
  ) {}

  create(dto: CreateCampeonatoDto) {
    const campeonato = this.repo.create(dto);
    return this.repo.save(campeonato);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const campeonato = await this.repo.findOne({
      where: { CampeonatoId: id },
    });

    if (!campeonato) {
      throw new NotFoundException('Campeonato não encontrado');
    }

    return campeonato;
  }

  async update(id: number, dto: UpdateCampeonatoDto) {
    const campeonato = await this.findOne(id);
    Object.assign(campeonato, dto);
    return this.repo.save(campeonato);
  }

  async remove(id: number) {
    const campeonato = await this.findOne(id);
    return this.repo.remove(campeonato);
  }
}
