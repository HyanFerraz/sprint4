import { Injectable } from '@nestjs/common';
import { CacheEntity } from '../infra/schemas/cache.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CacheManagerService {
  private readonly ttl = 15 * 60 * 1000;

  constructor(
    @InjectRepository(CacheEntity)
    private readonly cacheRepository: Repository<CacheEntity>,
  ) {}

  async getFromCache(key: string): Promise<CacheEntity> {
    const cache = await this.cacheRepository.findOne({ where: { key } });
    if (cache) {
      return await this.isCacheValid(cache) ? JSON.parse(cache.value) : null;
    }
    return null;
  }

  async saveToCache(key: string, value: any): Promise<void> {
    const cacheData = {
      key,
      value: JSON.stringify(value),
      ttl: this.ttl,
      createdAt: new Date().toISOString(),
    };
    await this.cacheRepository.save(cacheData);
  }

  async updateCache(key: string, newValue: any): Promise<void> {
    const existingCache = await this.cacheRepository.findOne({
      where: { key },
    });
    if (existingCache) {
      const createdAtDate = new Date(existingCache.createdAt).toISOString();
      existingCache.value = JSON.stringify(newValue);
      existingCache.ttl = this.ttl;
      existingCache.createdAt = createdAtDate;
      await this.cacheRepository.save(existingCache);
    } else {
      await this.saveToCache(key, newValue);
    }
  }

  private async isCacheValid(cache: CacheEntity): Promise<boolean> {
    const now = new Date();
    const cacheCreatedAt = new Date(cache.createdAt);
    if (now.getTime() - cacheCreatedAt.getTime() < cache.ttl) {
      return true;
    } else {
      await this.cacheRepository.remove(cache);
      return false
    }
  }
}
