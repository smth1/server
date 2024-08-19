import { ChatModel, MessageModel } from '../infrastructure';
import ws from 'ws';


export async function PrivateMessage(ws: ws, data: any) {
  const chat = await ChatModel.findById(data.chatId);

  if (!chat) {
    return ws.send(JSON.stringify({ error: 'Chat not found' }));
  }

  const message = await MessageModel.create({
    chatId: chat._id,
    type: 'message',
    sender: data.sender,
    data: data.message,
  });


  ws.send(JSON.stringify(message));
}