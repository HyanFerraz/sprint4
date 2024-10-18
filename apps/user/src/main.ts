import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const config = app.get(ConfigService);
  await app.listen(config.get('app').port);
}
bootstrap();
