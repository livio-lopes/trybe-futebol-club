import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/Team';

import TeamModel from '../models/TeamModel';

const OK = 200;

export default class TeamService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: OK, data: allTeams };
  }
}
