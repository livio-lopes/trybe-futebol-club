import { Router } from 'express';
import teamRouter from './TeamRoute';
import loginRouter from './LoginRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
