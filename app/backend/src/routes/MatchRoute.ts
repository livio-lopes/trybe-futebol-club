import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validation from '../middlewares/Validation';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get(
  '/',
  async (req, res) => { matchController.findAll(req, res); },
);

matchRouter.patch(
  '/:id/finish',
  Validation.tokenValidation,
  async (req, res) => { matchController.finishMatch(req, res); },
);

export default matchRouter;
