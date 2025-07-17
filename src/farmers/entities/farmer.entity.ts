import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Region } from 'src/region/entities';
import { farmerVirtuals } from './farmer.virtuals';
import { Title } from 'src/common/common.emum';

@Schema({
  timestamps: true,
})
export class Farmer extends Document{
  @Prop({ enum: Title, required: true })
  title: Title;

  @Prop({ required: true, type: String, trim: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  phoneNumber: string;

  @Prop({ type: String, trim: true })
  address?: string;

  @Prop({ type: String, trim: true })
  village?: string;

  @Prop({ type: String, trim: true })
  district?: string;

  @Prop({ type: Types.ObjectId, ref: 'Region' })
  stateId?: Types.ObjectId;

  @Prop({ type: String, match: /^\d{6}$/, trim: true })
  pinCode?: string;
}

export type FarmerDocument = Farmer & Document;
export const FarmerSchema = SchemaFactory.createForClass(Farmer);
farmerVirtuals(FarmerSchema);
