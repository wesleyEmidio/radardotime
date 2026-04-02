import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoutService } from './scout.service';
import { CreateScoutDto } from './dto/create-scout.dto';

@Controller('scout')
export class ScoutController {
  constructor(private readonly service: ScoutService) {}

  @Post()
  create(@Body() dto: CreateScoutDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post('seed')
  seed() {
    return this.service.seed();
  }
}
