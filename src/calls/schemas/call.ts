import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Details } from './details';
import { Address } from './address'

export type CallDocument = Call & Document;

@Schema({ autoIndex: true })
export class Call {
  readonly _id: Types.ObjectId;
  @Prop({ required: true })
  uuid: string;
  @Prop({ required: true, type: Details })
  details: Details;
  @Prop({ required: true })
  userUuid: string;
  @Prop({ default: false })
  deleted: boolean;
  @Prop({required: true, type: Address})
  address: Address;
}

export const CallSchema = SchemaFactory.createForClass(Call);
