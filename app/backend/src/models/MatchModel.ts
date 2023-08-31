import IMatch, { IGoalsScore, IMatchWithAssociations, INewMatch } from '../Interfaces/Match';
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

  public async findById(matchId: number): Promise<IMatch | undefined> {
    const dbMatch = await this.model.findByPk(matchId);
    return dbMatch as IMatch || undefined;
  }

  public async finishMatch(matchId:number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id: matchId } });
  }

  public async updateGoalsScore(goalsScore: IGoalsScore): Promise<void> {
    const { homeTeamGoals, awayTeamGoals, id } = goalsScore;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async createMatch(match: INewMatch): Promise<IMatch> {
    const newMatch = { ...match, inProgress: true };
    const dbMatch = await this.model.create(newMatch);
    return dbMatch;
  }
}
