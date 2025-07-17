import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Category extends Document {
  @Prop({ required: true, type: String })
  name: string;
}

export const CategorySchema= SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;
