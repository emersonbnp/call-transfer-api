import { Prop, Schema } from '@nestjs/mongoose';
import { Location } from './location';

@Schema({})
export class Details {
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  paymentValue: number;
  @Prop({ required: true })
  startDate: Date;
  @Prop({ required: true })
  duration: number;
  @Prop({ required: true, type: Location })
  location: Location;
}
