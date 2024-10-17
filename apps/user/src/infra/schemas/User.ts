import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './Products';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop([Product])
  products: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
