import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Seasonaltag extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isActive: boolean;
}

export const SeasonaltagSchema = SchemaFactory.createForClass(Seasonaltag);
export type SeasonaltagDocument = Seasonaltag & Document;
