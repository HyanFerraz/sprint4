import {
  IsString,
  IsEmail,
  IsArray,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ProductDto } from './Product.dto';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsArray()
  @IsOptional()
  products?: ProductDto[];
}
