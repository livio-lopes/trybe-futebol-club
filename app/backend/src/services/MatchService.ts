import IMatch, { IGoals, IGoalsScore } from '../Interfaces/Match';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

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

  public async createMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    if (match.homeTeamId === match.awayTeamId) {
      return { status: UNPROCESSABLE_ENTITY,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.matchModel.findById(match.homeTeamId);
    const awayTeam = await this.matchModel.findById(match.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: NOT_FOUND,
        data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch(match);
    return { status: CREATED, data: newMatch };
  }
}
