import { Schema } from 'mongoose';

export const farmerVirtuals = (farmerSchema: Schema) => {
  farmerSchema.virtual('stateInfo', {
    ref: 'Region',
    localField: 'stateId',
    foreignField: '_id',
    justOne: true,
  });
};
