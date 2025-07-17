import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Region {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: true })
  isDomestic: boolean;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ required: true })
  countryCode: string;
}

export type RegionDocument = Region & Document;
export const RegionSchema = SchemaFactory.createForClass(Region);
