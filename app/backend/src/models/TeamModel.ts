import ITeam from '../Interfaces/Team';
import SequelizeTeam from '../database/models/SequelizeTeams';

export default class TeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams.map((dbTeam) => ({
      id: dbTeam.id,
      teamName: dbTeam.teamName,
    }));
  }

  public async findById(id: number): Promise<ITeam | null> {
    const dbTeam = await this.model.findByPk(id);
    if (dbTeam) {
      return {
        id: dbTeam.id,
        teamName: dbTeam.teamName,
      };
    }
    return null;
  }
}
