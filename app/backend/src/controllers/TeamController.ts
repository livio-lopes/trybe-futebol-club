import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService: TeamService = new TeamService(),

  ) {
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const allTeams = await this.teamService.findAll();
    return res.status(allTeams.status).json(allTeams.data);
  }
}
