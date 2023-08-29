import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/Team';

import TeamModel from '../models/TeamModel';

const OK = 200;
const NOT_FOUND = 404;

export default class TeamService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: OK, data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: NOT_FOUND, data: { message: 'Team not found' } };
    return { status: OK, data: team };
  }
}
