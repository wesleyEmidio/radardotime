import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EquipeService } from '../equipe/equipe.service';

@Injectable()
export class ImportEquipeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly equipeService: EquipeService,
  ) {}

  async importarClubes() {
    const url = 'https://api.cartola.globo.com/clubes';

    const response = await firstValueFrom(this.httpService.get(url));

    const clubes = response.data;

    for (const key in clubes) {
      const clube = clubes[key];

      const equipe = {
        EquipeIdExt: clube.id,
        EquipeNome: clube.nome_fantasia,
        EquipeSigla: clube.abreviacao,
        EquipeEscudo: clube.escudos['60x60'],
      };

      // evita duplicado
      const existe = await this.equipeService.findByAbreviacao(
        clube.abreviacao,
      );

      if (!existe) {
        await this.equipeService.create(equipe);
      }
    }

    return { message: 'Importação concluída!' };
  }
}
