import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { SubProductDto } from './SubProducts.dto';

export class ProductDto {
  @IsNotEmpty()
  @ApiProperty({})
  id: string;

  @IsNotEmpty()
  @ApiProperty({})
  status: string;

  @IsNotEmpty()
  @ApiProperty({})
  product_name: string;

  @IsNotEmpty()
  @ApiProperty({})
  identifiers: string[];

  @IsNotEmpty()
  @ApiProperty({})
  product_type: string;

  @IsNotEmpty()
  @ApiProperty({})
  start_date: string;

  @IsNotEmpty()
  @ApiProperty({})
  subscription_type: string;

  @ApiProperty({})
  descriptions?: { text: string }[];

  @ApiProperty({})
  @ValidateNested({ each: true })
  @Type(() => SubProductDto)
  sub_products?: SubProductDto[];
}
