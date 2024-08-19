import { UserRepository } from '../infrastructure';
import { generateOtp, Jwt, RedisClient } from '../utils';
import { EmailService } from '../services';
import ws from 'ws';

export async function Login(ws: ws, data: any) {
  try {
    const { username, email } = data;

    if (!username || !email) {
      return ws.send(JSON.stringify({ error: 'Username and email are required.' }));
    }

    const cache = await RedisClient.connect();

    const found = await UserRepository.getByEmailAndUsername(email, username);
    // if (found.getStatus() !== UserStatusEnum.ACTIVE) throw new Error('Activate your account first!');

    if (!found) {
      return ws.send(JSON.stringify({
        error: 'User not found',
        message: 'You need to create a new account',
        code: 1,
      }));
    }

    const otp = generateOtp(6);
    const sent = await EmailService.SendVerificationCode(email, otp);

    if (!sent) {
      return ws.send(JSON.stringify({ error: 'Failed to send verification code' }));
    }

    const nextStepToken = Jwt.sign({ _id: found.getId().toString() });
    ws.send(JSON.stringify({ message: 'Verification code sent', nextStepToken }));

    await cache.set(found.getId().toString(), JSON.stringify({ id: found.getId(), otp }), 'EX', 300);

  } catch (error) {
    console.error('Login error:', error);
    ws.send(JSON.stringify({ error: 'An unexpected error occurred during login.' }));
  }
}
