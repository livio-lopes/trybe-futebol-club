import { Router } from 'express';

import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.findAll(req, res));

export default teamRouter;
