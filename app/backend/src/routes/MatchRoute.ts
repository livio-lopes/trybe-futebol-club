import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get(
  '/',
  async (req, res) => { matchController.findAll(req, res); },
);

export default matchRouter;
