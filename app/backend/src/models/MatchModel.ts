import IMatch, { IMatchWithAssociations } from '../Interfaces/Match';
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

  public async findById(matchId: number): Promise<IMatch> {
    const dbMatch = await this.model.findByPk(matchId);
    return dbMatch as IMatch;
  }

  public async finishMatch(matchId:number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id: matchId } });
  }
}
