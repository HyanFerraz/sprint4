import { Injectable } from '@nestjs/common';
import { User } from './infra/schemas/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '@app/common/dto/User.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(id: string): Promise<Model<User>> {
    return await this.userModel.findById(id);
  }

  async updateUserProducts(id: string, user: UserDto): Promise<any> {
    return await this.userModel.updateOne({ _id: id }, user);
  }
}
