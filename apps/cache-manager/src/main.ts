import { NestFactory } from '@nestjs/core';
import { CacheManagerModule } from './cache-manager.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CacheManagerModule);
  const config = app.get(ConfigService);
  await app.listen(config.get('app').port);
}
bootstrap();
