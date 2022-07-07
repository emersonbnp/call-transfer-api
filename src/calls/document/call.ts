import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Contact } from './contact';
import { Details } from './details';

export type CallDocument = Call & Document;

@Schema({ autoIndex: true })
export class Call {
  @Prop({ required: true, type: Details })
  readonly details: Details;
  @Prop({ required: true, type: Contact })
  readonly contact: Contact;
}

export const CallSchema = SchemaFactory.createForClass(Call);
