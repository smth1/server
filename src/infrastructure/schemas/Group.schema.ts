import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})

export class GroupSchema {
  _id: Types.ObjectId;

  @prop()
  name: string;

  @prop()
  members?: Array<Types.ObjectId>;

  @prop()
  admins?: Array<Types.ObjectId>;


}