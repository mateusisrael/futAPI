import { Router } from 'express';
import createTeamController from '../modules/Team/useCases/createTeamUseCase';
import listTeamController from '../modules/Team/useCases/listTeamsUseCase';

const teamRoutes = Router();

teamRoutes.post('/', (req, res) => {
  createTeamController().handle(req, res);
});

teamRoutes.get('/', (req, res) => {
  listTeamController().handle(req, res);
});

teamRoutes.get('/:name', (req, res) => {
  listTeamController().handle(req, res);
});

export { teamRoutes };
