import { Prop } from "@nestjs/mongoose";
import { SubProduct } from "./SubProducts";

export class Product {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  product_name: string;

  @Prop([String])
  identifiers: string[];

  @Prop({ required: true })
  product_type: string;

  @Prop({ required: true })
  start_date: string;

  @Prop({ required: true })
  subscription_type: string;

  @Prop([{ text: String }])
  descriptions?: { text: string }[];

  @Prop([SubProduct])
  sub_products?: SubProduct[];
}
