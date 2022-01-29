import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './tasks/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* use the validation decorator in the dtos */
  app.useGlobalPipes(new ValidationPipe());

  /* use to use the TransofmrInterceptor function for every http route 
    - This can be done in the controller level or
    - the handler level
  */
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
