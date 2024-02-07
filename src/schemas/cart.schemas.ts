import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: Types.ObjectId })
  userId: string | Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  partId: string | Types.ObjectId;

  @Prop({ required: true })
  image: string[];

  @Prop({ defaultValue: false })
  old: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
