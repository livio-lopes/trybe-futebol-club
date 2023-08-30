import IMatch from '../Interfaces/Match';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchesService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  public async findAll(query?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    if (!query) {
      return { status: 200, data: allMatches };
    }
    if (query === 'true') {
      const inProgressMatches = allMatches.filter((match) => match.inProgress === true);
      return {
        status: 200,
        data: inProgressMatches,
      };
    }
    const completedMatches = allMatches.filter((match) => match.inProgress === false);
    return {
      status: 200,
      data: completedMatches,
    };
  }
}
