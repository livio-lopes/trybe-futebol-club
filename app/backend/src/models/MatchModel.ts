import { IMatchWithAssociations } from '../Interfaces/Match';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchModel {
  private model = SequelizeMatches;

  public async findAll(): Promise<IMatchWithAssociations[]> {
    const dbMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        { model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    }) as unknown as IMatchWithAssociations[];
    return dbMatches;
  }
}
