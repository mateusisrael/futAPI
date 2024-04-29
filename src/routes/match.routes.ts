import { Router } from 'express';
import createMatchController from '../modules/Match/useCases/createMatch';

const matchRoutes = Router();

matchRoutes.post('/', (req, res) => {
  createMatchController().handle(req, res);
});

export { matchRoutes };
