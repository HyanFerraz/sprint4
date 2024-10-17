import { Prop } from "@nestjs/mongoose";

export class SubProduct {
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

  @Prop([{ text: String }])
  descriptions?: { text: string }[];
}
