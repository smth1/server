import { Jwt, RedisClient } from '../utils';
import { UserEntity, UserModel, UserStatusEnum } from '../infrastructure';
import { Types } from 'mongoose';
import ws from 'ws';

export async function ConfirmOtp(ws: ws, data: any) {
  try {
    const cache = await RedisClient.redis;
    const jwtId: any = (Jwt.verify(data.token));

    if (!jwtId) {
      return ws.send(JSON.stringify({ error: 'Invalid token' }));
    }
    // console.log(11, id)
    const cacheOtp = await cache.get(jwtId._id);
    const parsed = JSON.parse(cacheOtp);


    if (parsed.otp !== data.otp) {
      return ws.send(JSON.stringify({ error: 'Invalid OTP' }));
    }

    // todo: get data from repositories
    const found = await UserModel.findOne({ _id: new Types.ObjectId(parsed?.id), status: UserStatusEnum.ACTIVE });
    if (found) {
      return ws.send(JSON.stringify({
        userData: found,
        accessToken: Jwt.sign({ _id: found._id.toString() }),
      }));
    }

    ws.send(JSON.stringify({ error: 'User not found' }));

  } catch (error) {
    ws.send(JSON.stringify({ error: error }));
    console.log(error);
  }
}