import { getModelForClass } from '@typegoose/typegoose';
import { ChatSchema } from '../schemas';


export const ChatModel = getModelForClass(ChatSchema, {
  schemaOptions: {
    collection: 'chats',
    timestamps: true,
    versionKey: false,
    minimize: true,
  },
});