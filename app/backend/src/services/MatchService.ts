import IMatch, { IGoals, IGoalsScore } from '../Interfaces/Match';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

const OK = 200;
const NOT_FOUND = 404;

export default class MatchesService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  public async findAll(query?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    if (!query) {
      return { status: OK, data: allMatches };
    }
    if (query === 'true') {
      const inProgressMatches = allMatches.filter((match) => match.inProgress === true);
      return {
        status: OK,
        data: inProgressMatches,
      };
    }
    const completedMatches = allMatches.filter((match) => match.inProgress === false);
    return {
      status: OK,
      data: completedMatches,
    };
  }

  public async finishMatch(matchId: string): Promise<ServiceResponse<void>> {
    const numberMatchId = Number(matchId);
    const match = await this.matchModel.findById(numberMatchId);
    if (!match) {
      return { status: NOT_FOUND, data: { message: 'Match not found' } };
    }
    await this.matchModel.finishMatch(numberMatchId);
    return { status: OK, data: { message: 'Finished' } };
  }

  public async updateGoalsScore(goalsScore: IGoalsScore): Promise<ServiceResponse<IGoals>> {
    const { id } = goalsScore;
    const match = await this.matchModel.findById(id);
    if (!match) { return { status: NOT_FOUND, data: { message: 'Match not found' } }; }
    await this.matchModel.updateGoalsScore(goalsScore);
    return { status: OK, data: { message: 'Goals score updated' } };
  }
}
