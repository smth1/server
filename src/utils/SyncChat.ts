import { ChatRepository, UserRepository } from '../infrastructure';


export async function SyncChat() {
  setInterval(async () => {
    const chats = await ChatRepository.list();

    chats.map(async chat => {
      const user = await UserRepository.getById(chat.getUser1());
      const user2 = await UserRepository.getById(chat.getUser2());


      if (!user.getChats()?.find(chatId => chatId !== chat.getId())) {
        const updated = user.buildChats([...user.getChats(), chat.getId()]);
        await UserRepository.update(user);
        console.log(updated);
      }
      if (!user2.getChats()?.find(chatId => chatId !== chat.getId())) {
        user2.buildChats([...user2.getChats(), chat.getId()]);
        await UserRepository.update(user2);
      }
    });
  }, 3000);
}