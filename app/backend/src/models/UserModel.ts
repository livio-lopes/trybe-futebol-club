import IUser from '../Interfaces/User';
import SequelizeUser from '../database/models/SequelizeUsers';

export default class UserModel {
  private model = SequelizeUser;

  public async findByEmail(email:string): Promise<IUser | null> {
    const dbUser = await this.model.findOne({ where: { email } });
    return dbUser || null;
  }
}
