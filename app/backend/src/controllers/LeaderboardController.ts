import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

const OK = 200;

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.getLeaderboard(undefined);
    return res.status(OK).json(leaderboard);
  }

  public async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.getLeaderboard('home');
    return res.status(OK).json(leaderboard);
  }

  public async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.getLeaderboard('away');
    return res.status(OK).json(leaderboard);
  }
}
