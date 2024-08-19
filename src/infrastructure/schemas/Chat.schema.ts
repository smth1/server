import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})

export class ChatSchema {
  _id: Types.ObjectId;

  @prop()
  user1: Types.ObjectId;

  @prop()
  user2: Types.ObjectId;
}