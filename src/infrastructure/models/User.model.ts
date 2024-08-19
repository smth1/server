import { getModelForClass } from '@typegoose/typegoose';
import { UserSchema } from '../schemas';


export const UserModel = getModelForClass(UserSchema, {
  schemaOptions: {
    collection: 'users',
    timestamps: true,
    versionKey: false,
    minimize: true,
  },
});