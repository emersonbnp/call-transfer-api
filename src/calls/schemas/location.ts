import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Location {
  @Prop()
  type: string = 'Point';
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];
}
