import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

export default class Token {
  private static config:SignOptions = { algorithm: 'HS256', expiresIn: '1h' };
  private static secret = process.env.JWT_SECRET || 'jwt_secret';
  static create(payload: JwtPayload): string {
    return sign(payload, Token.secret, Token.config);
  }

  private static extractBearer(token:string):string | undefined {
    return token.split(' ')[1];
  }

  static check(token: string): JwtPayload | undefined {
    try {
      const bearerToken = Token.extractBearer(token);
      if (bearerToken) {
        return verify(bearerToken, Token.secret) as JwtPayload;
      }
      return verify(token, Token.secret) as JwtPayload;
    } catch (error) {
      return undefined;
    }
  }
}
