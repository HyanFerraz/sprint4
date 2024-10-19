import { Module } from '@nestjs/common';
import { CacheManagerController } from './cache-manager.controller';
import { CacheManagerService } from './services/cache-manager.service';
import { InfraModule } from './infra/infra.module';
import { ApiService } from './services/api.service';
import { QueueService } from './services/queue.service';

@Module({
  imports: [InfraModule],
  controllers: [CacheManagerController],
  providers: [CacheManagerService, ApiService, QueueService],
})
export class CacheManagerModule {}
