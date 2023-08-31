import { Request, Response } from 'express';
import MatchesService from '../services/MatchService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const allMatches = await this.matchesService.findAll(inProgress as string);
    return res.status(allMatches.status).json(allMatches.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const match = await this.matchesService.finishMatch(id);
    return res.status(match.status).json(match.data);
  }
}
