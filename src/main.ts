import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as auth from 'express-basic-auth';
import { swaggerInit } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  
  const config = new ConfigService();
  
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    '/api/docs',
    auth({
      challenge: true,
      users: { admin: config.get('PASS_SWAGGER') },
    }),
  );

  swaggerInit(app);

  await app.listen(3000);

}
bootstrap();
