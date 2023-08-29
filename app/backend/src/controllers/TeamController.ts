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

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamService.findById(Number(id));
    return res.status(team.status).json(team.data);
  }
}
