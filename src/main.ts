import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Ativa a "lista branca" de propriedades: apenas propriedades decoradas com validações serão aceitas
      whitelist: true,
      // Proíbe propriedades não listadas na "lista branca": lança erro se propriedades não decoradas forem enviadas
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
