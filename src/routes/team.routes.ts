import { Router } from 'express';
import createTeamController from '../modules/Team/useCases/createTeamUseCase';
import listTeamController from '../modules/Team/useCases/listTeamsUseCase';
import uploadEmblemController from '../modules/Team/useCases/uploadEmblem';
import { storage, upload } from '../multerConfig';

const teamRoutes = Router();

teamRoutes.post('/', (req, res) => {
  createTeamController().handle(req, res);
});

teamRoutes.get('/', (req, res) => {
  listTeamController().handle(req, res);
});

teamRoutes.get('/:id', (req, res) => {
  listTeamController().handle(req, res);
});

teamRoutes.post('/:name/emblem', upload.single('image'), (req, res) => {
  uploadEmblemController().handle(req, res);
});

export { teamRoutes };
