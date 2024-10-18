import { Injectable } from '@nestjs/common';
import { User } from './infra/schemas/User';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ProductDto } from './dto/Product.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(id: string): Promise<Model<User>> {
    return await this.userModel.findById(id);
  }

  async addProductToUser(
    userId: string,
    product: ProductDto,
  ): Promise<Document> {
    const user = await this.userModel.findById(userId);
    user.products.push(product);
    await this.userModel.replaceOne({ _id: userId }, user);
    return user;
  }

  async removeProductFromUser(
    userId: string,
    productId: string,
  ): Promise<Document> {
    const user = await this.userModel.findById(userId);
    user.products = user.products.filter((product) => product.id !== productId);
    await this.userModel.replaceOne({ _id: userId }, user);
    return user;
  }
}
