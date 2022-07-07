import { Prop, Schema } from '@nestjs/mongoose';

@Schema({})
export class Contact {
  @Prop({ required: true })
  readonly name: string;
  @Prop({ required: true })
  readonly phone: string;
}
