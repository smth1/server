import jwt from 'jsonwebtoken';

export class Jwt {
  static sign(userId: string | object) {
    return jwt.sign(userId, process?.env?.JWT_SECRET || '1234');
  }

  static verify(token: string) {
    return jwt.verify(token, process?.env?.JWT_SECRET || '1234');
  }
}