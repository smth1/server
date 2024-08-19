import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// export const Client = async () => {
//     try {
//         const redis = createClient({
//             url: process.env.REDIS_URL,
//         });
//
//         redis.on("error", (err) => console.log(err));
//
//         await redis.connect();
//         return redis
//     } catch (err: unknown) {
//         console.log(err);
//     }
// };

export class RedisClient {
  static redis: any;

  static async connect() {
    this.redis = createClient({
      url: process.env.REDIS_URL,
    });
    this.redis.on('error', (err: unknown) => console.log('Redis Error', err));
    await this.redis.connect();
    return this.redis;
  }

  // static async set(key: string, value: string) {
  //     if (!this.redis){
  //         await this.connect()
  //     }
  //
  //     this.redis.setEx(key, value)
  //
  //
  //
  // }
}
