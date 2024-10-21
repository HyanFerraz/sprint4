import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const config = app.get(ConfigService);
  app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(config.get('app').port);
}
bootstrap();
