import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosicaoModule } from './posicao/posicao.module';
import { EquipeModule } from './equipe/equipe.module';
import { JogadorModule } from './jogador/jogador.module';
import { ScoutModule } from './scout/scout.module';
import { CampeonatoModule } from './campeonato/campeonato.module';
import { CampeonatoEquipeModule } from './campeonatoEquipe/campeonatoEquipe.module';

@Module({
  imports: [
    PosicaoModule,
    EquipeModule,
    JogadorModule,
    ScoutModule,
    CampeonatoModule,
    CampeonatoEquipeModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        if (process.env.DB_TYPE === 'better-sqlite3') {
          return {
            type: 'better-sqlite3',
            database: process.env.DB_DATABASE || './db.sqlite',
            synchronize: process.env.DB_SYNCHRONIZE === '1',
            autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1',
          };
        }

        // Caso contrário, usa PostgreSQL (geralmente produção)
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          synchronize: process.env.DB_SYNCHRONIZE === '1',
          autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1',
        };
      },
    }),
    PosicaoModule,
    EquipeModule,
    JogadorModule,
    ScoutModule,
    CampeonatoModule,
    CampeonatoEquipeModule,
  ],

  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
