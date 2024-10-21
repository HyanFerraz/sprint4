import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { InfraModule } from './infra/infra.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [InfraModule],
  controllers: [GatewayController],
  providers: [GatewayService, JwtStrategy],
})
export class GatewayModule {}
