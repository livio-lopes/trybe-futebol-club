import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validation from '../middlewares/Validation';

const userController = new UserController();
const loginRouter = Router();

loginRouter.post(
  '/',
  Validation.loginFieldsRequired,
  async (req, res) => { userController.login(req, res); },
);

loginRouter.get(
  '/role',
  Validation.tokenValidation,
  (req, res) => { UserController.loginRole(req, res); },
);
export default loginRouter;
