import ITeam from '../Interfaces/Team';
import SequelizeTeam from '../database/models/SequelizeTeams';

export default class TeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const dbTeams = await this.model.findAll();
    console.log(dbTeams);
    return dbTeams.map((dbTeam) => ({
      id: dbTeam.id,
      teamName: dbTeam.teamName,
    }));
  }
}
