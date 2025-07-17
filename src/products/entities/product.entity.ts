import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ProductCategory,
  ProductStatus,
  ProductUnit,
  SeasonalTag,
} from '../enum/products.enum';
import { Region } from 'src/common/common.emum';
import { productVirtuals } from './product.virtuals';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ unique: true, index: true })
  slug: string;

  @Prop({ required: true, maxlength: 500 })
  description: string;

  @Prop({
    required: true,
    type: [String],
    validate: [
      (val: string[]) => val.length >= 1 && val.length <= 10,
      'images must have 1 to 10 URLs',
    ],
  })
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'Farmer', required: true })
  farmerId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, enum: ProductUnit })
  unit: ProductUnit;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true, enum: ProductCategory })
  category: ProductCategory;

  @Prop({ default: false })
  isOrganic: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Region' })
  regionId?: Types.ObjectId;

  @Prop({ maxlength: 50 })
  origin?: string;

  @Prop({ enum: SeasonalTag })
  seasonalTag?: SeasonalTag;

  @Prop({ enum: ProductStatus, default: ProductStatus.PendingApproval })
  status: string;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
productVirtuals(ProductSchema);
ProductSchema.index({ region: 1, category: 1, status: 1, farmerId: 1 });
