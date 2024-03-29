import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),

  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const allTeams = await this.userService.login(req.body);
    return res.status(allTeams.status).json(allTeams.data);
  }

  public static loginRole(req: Request, res: Response): Response {
    const { role } = req.body;
    return res.status(200).json({ role });
  }
}
