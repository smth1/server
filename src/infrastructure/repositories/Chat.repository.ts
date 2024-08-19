import { ChatModel } from '../models';
import { ChatEntity } from '../entities';
import { Types } from 'mongoose';

export class ChatRepository {

  static async list() {
    const chats = await ChatModel.find();
    return chats?.map(chat => new ChatEntity().convertToEntity(chat));
  }

  static async getById(chatId: Types.ObjectId): Promise<ChatEntity> {
    const chat = await ChatModel.findOne({ chatId })
    return new ChatEntity().convertToEntity(chat);
  }
}