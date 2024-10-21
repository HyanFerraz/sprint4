import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ProductDto } from '@app/common';

@Controller('gateway/users')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.gatewayService.getUser(id);
  }

  @Patch(':id/products')
  async addProductToUser(
    @Param('id') userId: string,
    @Body() product: ProductDto,
  ) {
    return await this.gatewayService.addProductToUser(userId, product);
  }

  @Patch(':id/products/:product')
  async removeProductToUser(
    @Param('id') userId: string,
    @Param('product') productId: string,
  ) {
    return await this.gatewayService.RemoveProductFromUser(userId, productId);
  }
}
