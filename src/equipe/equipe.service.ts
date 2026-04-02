import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { InterfaceEquipe } from './equipe-response.interface';
import { Equipe } from './entities/equipe.entity';

@Injectable()
export class EquipeService {
  private readonly url = 'https://api.cartola.globo.com/atletas/mercado';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Equipe)
    private readonly equipeRepository: Repository<Equipe>,
  ) {}

  async importarEquipes(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<InterfaceEquipe>(this.url),
      );

      const clubes = response.data.clubes;

      for (const key in clubes) {
        const clube = clubes[key];

        const existe = await this.equipeRepository.findOne({
          where: { EquipeId: clube.id },
        });

        if (!existe) {
          const novaEquipe = this.equipeRepository.create({
            EquipeId: clube.id,
            EquipeNome: clube.nome,
            EquipeAbreviacao: clube.abreviacao,
            EquipeSlug: clube.slug,
            EquipeApelido: clube.apelido,
            EquipeNomeFantasia: clube.nome_fantasia,
            EquipeUrlEditoria: clube.url_editoria,
            EquipeEscudo1: clube.escudos['60x60'],
            EquipeEscudo2: clube.escudos['45x45'],
            EquipeEscudo3: clube.escudos['30x30'],
          });

          await this.equipeRepository.save(novaEquipe);
        }
      }

      return true;
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }

  async listar(): Promise<Equipe[]> {
    return this.equipeRepository.find();
  }
}
