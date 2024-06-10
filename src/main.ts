import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';

(async () => {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main NestApplication');

  app.setGlobalPrefix(envs.apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(envs.port);
  logger.log(`Server ${envs.apiName} is running on port ${envs.port}`);
})();
