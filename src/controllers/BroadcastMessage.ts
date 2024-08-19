import ws from 'ws';

export function BroadcastMessage(message: any, server: any) {
  try {
    message = JSON.parse(message);
    // if (message.chatId === "private_chat") {
    //     console.log(message)
    //     // const recipient = server?.clients?.find((c: any) => c.readyState === ws.OPEN && c.id === message.recipientId);
    //     let i = 0;
    //     for (const client of server.clients) {
    //         console.log(i, ')', client)
    //         i = i + 1;
    //     }
    //     // if (recipient) {
    //     //     return recipient.send(JSON.stringify(message));
    //     // } else {
    //     //     return server.send(JSON.stringify({error: 'recipient not found'}));
    //     // }
    // }
    for (const client of server.clients) {
      client.send(JSON.stringify(message));
    }
  } catch (error) {
    console.log(error);
  }
}