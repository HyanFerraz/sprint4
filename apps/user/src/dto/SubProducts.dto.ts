import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SubProductDto {
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

  @ApiProperty({})
  descriptions?: { text: string }[];
}