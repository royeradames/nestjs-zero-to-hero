import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* use the validation decorator in the dtos */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
