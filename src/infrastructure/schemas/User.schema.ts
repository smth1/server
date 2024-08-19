import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { UserStatusEnum } from '../enums';


@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class UserSchema {

  _id?: Types.ObjectId;

  @prop()
  userName?: string;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  phoneNumber: string;

  @prop()
  email?: string;

  @prop()
  accessToken: string;

  @prop()
  lastActivity: Date;

  @prop()
  isOnline: boolean;

  @prop()
  groups?: Array<Types.ObjectId>;

  @prop()
  chats: Array<Types.ObjectId>;

  @prop()
  status: UserStatusEnum;

}