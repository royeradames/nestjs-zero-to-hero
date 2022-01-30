import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './tasks/transform.interceptor';

async function bootstrap() {
  /* uses nestjs console log so it key parts of your custom code appears in the terminal like the defaut nestjs logs */
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  /* use the validation decorator in the dtos */
  app.useGlobalPipes(new ValidationPipe());

  /* use to use the TransofmrInterceptor function for every http route 
    - This can be done in the controller level or
    - the handler level
  */
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = 3000;
  await app.listen(port);
  logger.log(`Aplication is running on port ${port}`, true);
}
bootstrap();
