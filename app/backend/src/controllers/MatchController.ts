import { Request, Response } from 'express';
import MatchesService from '../services/MatchService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const allMatches = await this.matchesService.findAll();
    return res.status(allMatches.status).json(allMatches.data);
  }
}
