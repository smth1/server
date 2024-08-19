import dotenv from 'dotenv';
import ws from 'ws';
import { BroadcastMessage, ConfirmOtp, Login, PrivateMessage, Register } from './controllers/';
import { Db } from './utils/db';
import { SyncChat } from './utils';

dotenv.config();

const PORT = 8080;

async function main() {
  await new Db().connect();
  const server = new ws.Server({ port: PORT }, () => {
    console.log(`server listening on ${PORT}`);
  });

  server.on('connection', function connection(ws: ws, req) {
    SyncChat();

    ws.on('message', async function(message: any) {

      const data = JSON.parse(message.toString());

      switch (data.type) {
        case 'register':
          await Register(ws, data);
          break;
        case 'login':
          await Login(ws, data);
          break;
        case 'verifyOtp':
          await ConfirmOtp(ws, data);
          break;
        case 'message':
          BroadcastMessage(message, server);
          break;
        case 'private':
          await PrivateMessage(ws, data);
          break;
      }
    });
  });
}

main().then();










