import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ProductDto } from './dto/Product.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Patch(':userId/products/')
  async addProductToUser(
    @Param('userId') userId: string,
    @Body() product: ProductDto,
  ) {
    return await this.userService.addProductToUser(userId, product);
  }

  @Patch(':userId/products/:productId')
  async RemoveProductFromUser(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return await this.userService.removeProductFromUser(userId, productId);
  }
}
