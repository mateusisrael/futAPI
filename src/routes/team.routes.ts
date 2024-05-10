import { Router } from 'express';
import createTeamController from '@modules/Team/useCases/createTeamUseCase';

const teamRoutes = Router();

teamRoutes.get('/', (req, res) => {
  createTeamController().handle(req, res);
});

export { teamRoutes };
