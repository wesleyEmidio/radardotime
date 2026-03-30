import { Controller, Post } from '@nestjs/common';
import { ImportEquipeService } from './import-equipe.service';

@Controller('import')
export class ImportEquipeController {
  constructor(private readonly service: ImportEquipeService) {}

  @Post('clubes')
  importar() {
    return this.service.importarClubes();
  }
}
