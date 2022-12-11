import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Details } from './details';

export type CallDocument = Call & Document;

@Schema({ autoIndex: true })
export class Call {
  @Prop()
  readonly _id: Types.ObjectId;
  @Prop({ required: true, type: Details })
  readonly details: Details;
  @Prop({ required: true })
  userUuid: string;
  @Prop({ default: false })
  deleted: boolean;
}

export const CallSchema = SchemaFactory.createForClass(Call);
