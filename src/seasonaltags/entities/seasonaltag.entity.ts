import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class Seasonaltag extends Document {
  @Prop({ required: true, type: String })
  name: string;
}

export const SeasonaltagSchema= SchemaFactory.createForClass(Seasonaltag);
export type SeasonaltagDocument = Seasonaltag & Document;