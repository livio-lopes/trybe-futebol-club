import { Router } from 'express';
import teamRouter from './TeamRoute';
import loginRouter from './LoginRoute';
import matchRouter from './MatchRoute';
import leaderboardRouter from './LeaderboardRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
