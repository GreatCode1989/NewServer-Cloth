import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ClothDocument = Cloth & Document;

@Schema()
export class Cloth {
  @Prop({ required: true })
  text: string;
  _id: mongoose.Types.ObjectId | string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  image: string[];

  @Prop({ required: true })
  in_stock: number;

  @Prop({ required: true })
  in_shop: boolean;

  @Prop({ defaultValue: false })
  popularity: boolean;

  @Prop({ defaultValue: false })
  old: boolean;
}

export const ClothSchema = SchemaFactory.createForClass(Cloth);
