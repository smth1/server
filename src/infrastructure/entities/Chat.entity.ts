import { Types } from 'mongoose';
import { ChatSchema } from '../schemas';


export class ChatEntity {
  protected _id: Types.ObjectId;
  protected _user1: Types.ObjectId;
  protected _user2: Types.ObjectId;

  getId(): Types.ObjectId {
    return this._id;
  }


  getUser1(): Types.ObjectId {
    return this._user1;
  }


  getUser2(): Types.ObjectId {
    return this._user2;
  }

  buildId(id: Types.ObjectId): ChatEntity {
    this._id = id;
    return this;
  }

  buildUser1(user1: Types.ObjectId): ChatEntity {
    this._user1 = user1;
    return this;
  }

  buildUser2(user2: Types.ObjectId): ChatEntity {
    this._user2 = user2;
    return this;
  }

  convertToEntity(chat: ChatSchema): ChatEntity {
    return chat ? this.buildId(chat._id)
      .buildUser1(chat.user1)
      .buildUser2(chat.user2) : null;
  }

  convertToSchema(): ChatSchema {
    return this ? {
      _id: this._id,
      user1: this._user1,
      user2: this._user2,
    } : null;
  }


}