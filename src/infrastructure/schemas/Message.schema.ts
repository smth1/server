import { Types } from 'mongoose';
import { modelOptions, prop, Severity } from '@typegoose/typegoose';


@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})

export class MessageSchema {
  _id: Types.ObjectId;

  @prop()
  chatId: Types.ObjectId;

  @prop()
  sender: Types.ObjectId;

  @prop()
  data: string;

}