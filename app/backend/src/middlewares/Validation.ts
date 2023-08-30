import { Request, Response, NextFunction } from 'express';
import Token from '../utils/Token';
import ValidateLogin from '../utils/ValidateLogin';

const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const TOKEN_REQUIRED = { message: 'Token not found' };
const TOKEN_INVALID = { message: 'Token must be a valid token' };
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

  static tokenValidation(req: Request, res: Response, _next: NextFunction) : Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(UNAUTHORIZED).json(TOKEN_REQUIRED);
    }
    const validToken = Token.check(token) ? Token.check(token) : null;
    if (!validToken) {
      return res.status(UNAUTHORIZED).json(TOKEN_INVALID);
    }
    return res.status(OK).json({ role: validToken.role });
  }
}
