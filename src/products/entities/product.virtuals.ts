import { Schema } from 'mongoose';

export const productVirtuals = (productSchema: Schema) => {
  productSchema.virtual('farmerInfo', {
    ref: 'Farmer',
    localField: 'farmerId',
    foreignField: '_id',
    justOne: true,
  });
  productSchema.virtual('regionInfo', {
    ref: 'Region',
    localField: 'regionId',
    foreignField: '_id',
    justOne: true,
  });
};
