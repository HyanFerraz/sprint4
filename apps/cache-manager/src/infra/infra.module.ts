import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheEntity } from './schemas/cache.entity';
import configuration, { RedisConnectionOptions } from '../config';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/db.sqlite',
      entities: [CacheEntity],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([CacheEntity]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection:
          configService.get<RedisConnectionOptions>('redis.connection'),
      }),
    }),
    BullModule.registerQueue({
      name: 'update-db',
    }),
  ],
  exports: [TypeOrmModule, HttpModule, BullModule],
})
export class InfraModule {}
