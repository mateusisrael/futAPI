import { matchRoutes } from '@routes/match.routes';
import { CreateTeamController } from './createTeamController';
import { TeamRepository } from '@modules/Team/repositories/teamRepository';
import { CreateTeamUseCase } from './createTeamUseCase';

export default (): CreateTeamController => {
  const teamRepository = TeamRepository.getInstance();
  const teamUseCase = new CreateTeamUseCase(teamRepository);
  const teamController = new CreateTeamController(teamUseCase);

  return teamController;
};
