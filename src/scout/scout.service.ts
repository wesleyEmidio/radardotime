import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScoutDto } from './dto/create-scout.dto';
import { Scout } from './entities/scout.entity';

@Injectable()
export class ScoutService {
  constructor(
    @InjectRepository(Scout)
    private repo: Repository<Scout>,
  ) {}

  async create(dto: CreateScoutDto) {
    const exists = await this.repo.findOne({
      where: { ScoutCod: dto.ScoutCod },
    });

    if (exists) {
      throw new ConflictException('Scout já existe');
    }

    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  async seed() {
    const dados: CreateScoutDto[] = [
      { ScoutCod: 'A', ScoutNome: 'Assistência', ScoutValor: 5.0 },
      { ScoutCod: 'CA', ScoutNome: 'Cartão Amarelo', ScoutValor: -1.0 },
      { ScoutCod: 'CV', ScoutNome: 'Cartão Vermelho', ScoutValor: -3.0 },
      { ScoutCod: 'DE', ScoutNome: 'Defesa', ScoutValor: 1.3 },
      { ScoutCod: 'DP', ScoutNome: 'Defesa de pênalti', ScoutValor: 7.0 },
      { ScoutCod: 'DS', ScoutNome: 'Desarme', ScoutValor: 1.5 },
      { ScoutCod: 'FC', ScoutNome: 'Falta cometida', ScoutValor: -0.3 },
      { ScoutCod: 'FD', ScoutNome: 'Finalização Defendida', ScoutValor: 1.2 },
      { ScoutCod: 'FF', ScoutNome: 'Finalização para fora', ScoutValor: 0.8 },
      { ScoutCod: 'FS', ScoutNome: 'Falta Sofrida', ScoutValor: 0.5 },
      { ScoutCod: 'FT', ScoutNome: 'Finalização na Trave', ScoutValor: 3.0 },
      { ScoutCod: 'G', ScoutNome: 'Gol', ScoutValor: 8.0 },
      { ScoutCod: 'GC', ScoutNome: 'Gol contra', ScoutValor: -3.0 },
      { ScoutCod: 'GS', ScoutNome: 'Gol sofrido', ScoutValor: -1.0 },
      { ScoutCod: 'I', ScoutNome: 'Impedimento', ScoutValor: -0.1 },
      { ScoutCod: 'PC', ScoutNome: 'Pênalti cometido', ScoutValor: -1.0 },
      { ScoutCod: 'PP', ScoutNome: 'Pênalti perdido', ScoutValor: -4.0 },
      { ScoutCod: 'PS', ScoutNome: 'Pênalti sofrido', ScoutValor: 1.0 },
      { ScoutCod: 'SG', ScoutNome: 'Saldo de gol', ScoutValor: 5.0 },
      { ScoutCod: 'V', ScoutNome: 'Vitória', ScoutValor: 1.0 },
    ];

    for (const item of dados) {
      const exists = await this.repo.findOne({
        where: { ScoutCod: item.ScoutCod },
      });

      if (!exists) {
        await this.repo.save(item);
      }
    }

    return { message: 'Seed executado com sucesso' };
  }
}
