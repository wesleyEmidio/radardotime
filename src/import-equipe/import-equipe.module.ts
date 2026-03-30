import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ImportEquipeService } from './import-equipe.service';
import { ImportEquipeController } from './import-equipe.controller';
import { EquipeModule } from '../equipe/equipe.module';

@Module({
  imports: [
    HttpModule,
    EquipeModule, // importante!
  ],
  providers: [ImportEquipeService],
  controllers: [ImportEquipeController],
})
export class ImportEquipeModule {}
