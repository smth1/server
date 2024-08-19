import { getModelForClass } from '@typegoose/typegoose';
import { MessageSchema } from '../schemas';


export const MessageModel = getModelForClass(MessageSchema, {
  schemaOptions: {
    collection: 'messages',
    timestamps: true,
    versionKey: false,
    minimize: true,
  },
});