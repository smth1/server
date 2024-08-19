import { getModelForClass } from '@typegoose/typegoose';
import { GroupSchema } from '../schemas';


export const GroupModel = getModelForClass(GroupSchema, {
  schemaOptions: {
    timestamps: true,
    collection: 'groups',
    versionKey: false,
    minimize: true,
  },
});