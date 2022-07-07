import { Prop, Schema } from '@nestjs/mongoose';
import { Location } from './location';

@Schema({})
export class Details {
  @Prop({ required: true })
  readonly description: string;
  @Prop({ required: true })
  readonly paymentValue: number;
  @Prop({ required: true })
  readonly startDate: Date;
  @Prop({ required: true })
  readonly duration: number;
  @Prop({ required: true, type: Location })
  readonly location: Location;
}
