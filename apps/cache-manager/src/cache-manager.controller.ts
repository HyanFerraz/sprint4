import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CacheManagerService } from './services/cache-manager.service';
import { ApiService } from './services/api.service';
import { ProductDto } from '@app/common';
import { QueueService } from './services/queue.service';
import { CacheEntity } from './infra/schemas/cache.entity';
import { UserDto } from '@app/common/dto/User.dto';

@Controller('users')
export class CacheManagerController {
  constructor(
    private readonly cacheManagerService: CacheManagerService,
    private readonly apiService: ApiService,
    private readonly queueService: QueueService,
  ) {}

  private async getUserData(id: string): Promise<any> {
    let data = await this.cacheManagerService.getFromCache(id);
    if (!data) {
      data = await this.apiService.getUserFromApi(id);
      await this.cacheManagerService.saveToCache(id, data);
    }

    return data;
  }

  @Get(':id')
  async getData(@Param('id') id: string): Promise<CacheEntity> {
    return await this.getUserData(id);
  }

  @Patch(':userId/products/')
  async addProductToUser(
    @Param('userId') userId: string,
    @Body() product: ProductDto,
  ) {
    const user: UserDto = await this.getUserData(userId);
    user.products.push(product);
    this.cacheManagerService.updateCache(userId, user);
    this.queueService.enqueueDbUpdate(userId, user);
    return user;
  }

  @Patch(':userId/products/:productId')
  async RemoveProductFromUser(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    const user: UserDto = await this.getUserData(userId);
    user.products = user.products.filter((product) => product.id !== productId);
    this.cacheManagerService.updateCache(userId, user);
    this.queueService.enqueueDbUpdate(userId, user);
    return user;
  }
}
