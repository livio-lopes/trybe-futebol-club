import { Request, Response, NextFunction } from 'express';
import ValidateLogin from '../utils/ValidateLogin';

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FIELDS_REQUIRED = { message: 'All fields must be filled' };
const INVALID_FIELDS = { message: 'Invalid email or password' };

export default class Validation {
  static loginFieldsRequired(req: Request, res: Response, next: NextFunction) : Response | void {
    const login = req.body;
    if (!login.email || !login.password) {
      return res.status(BAD_REQUEST).json(FIELDS_REQUIRED);
    }
    const isNotMinSizePassword = login.password.length < 6;
    const invalidEmail = !ValidateLogin.validEmail(login.email);
    if (invalidEmail || isNotMinSizePassword) {
      return res.status(UNAUTHORIZED).json(INVALID_FIELDS);
    }
    return next();
  }
}
