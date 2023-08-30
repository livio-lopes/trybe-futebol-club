import * as bcrypt from 'bcryptjs';

export default class ValidateLogin {
  static validPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  static validEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
