import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get(
  '/',
  async (request, response) => { leaderboardController.getLeaderboard(request, response); },
);

leaderboardRouter.get(
  '/away',
  async (request, response) => { leaderboardController.getLeaderboardAway(request, response); },
);

leaderboardRouter.get(
  '/home',
  async (request, response) => { leaderboardController.getLeaderboardHome(request, response); },
);

export default leaderboardRouter;
