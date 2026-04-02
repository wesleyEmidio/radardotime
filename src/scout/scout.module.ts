import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoutService } from './scout.service';
import { ScoutController } from './scout.controller';
import { Scout } from './entities/scout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scout])],
  controllers: [ScoutController],
  providers: [ScoutService],
})
export class ScoutModule {}
