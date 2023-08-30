import IUser from '../Interfaces/User';
import IToken from '../Interfaces/Token';
import ILogin from '../Interfaces/Login';
import UserModel from '../models/UserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ValidateLogin from '../utils/ValidateLogin';
import Token from '../utils/Token';

const UNAUTHORIZED = 401;
const OK = 200;
const INVALID_FIELDS = { message: 'Invalid email or password' };

export default class UserService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) {}

  public async login(userlogin:ILogin): Promise<ServiceResponse<IToken>> {
    const { email, password } = userlogin;
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: UNAUTHORIZED, data: INVALID_FIELDS };
    }
    const isValidPassword = ValidateLogin.validPassword(password, user.password);
    if (!isValidPassword) {
      return { status: UNAUTHORIZED, data: INVALID_FIELDS };
    }
    const { id, username, role } = user as IUser;
    const token = Token.create({ id, username, role });
    return { status: OK, data: { token } };
  }
}
