import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [InfraModule],
  controllers: [UserController],
  providers: [UserService, QueueProcessor],
})
export class UserModule {}
