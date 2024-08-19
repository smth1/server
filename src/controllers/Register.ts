import { UserEntity, UserRepository, UserStatusEnum } from '../infrastructure';
import { Jwt } from '../utils';
import ws from 'ws';

export async function Register(ws: ws, data: any) {
  try {
    const { username, email, phoneNumber } = data;

    // Validate input
    if (!username || !email || !phoneNumber) {
      return ws.send(JSON.stringify({ error: 'Fill all required credentials!' }));
    }

    const checkEmail = await UserRepository.getByEmail(email);
    if (checkEmail) {
      return ws.send(JSON.stringify({ error: 'User already exists' }));
    }

    const user = new UserEntity()
      .buildUsername(username)
      .buildPhoneNumber(phoneNumber)
      .buildStatus(UserStatusEnum.ACTIVE)
      .buildEmail(email);

    const created = await UserRepository.create(user);

    if (created) {
      const userData = created.convertToSchema();
      const accessToken = Jwt.sign({ _id: created.getId().toString() });

      return ws.send(JSON.stringify({ userData, accessToken }));
    }

    ws.send(JSON.stringify({ error: 'Error while registering' }));
  } catch (error) {
    ws.send(JSON.stringify({ error: 'An unexpected error occurred during registration.' }));
    console.error('Registration error:', error);
  }
}
