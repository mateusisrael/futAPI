import { matchRoutes } from '../../../../routes/match.routes';
import { CreateTeamController } from './createTeamController';
import { TeamRepository } from '../../repositories/teamRepository';
import { CreateTeamUseCase } from './createTeamUseCase';

export default (): CreateTeamController => {
  const teamRepository = new TeamRepository();
  const teamUseCase = new CreateTeamUseCase(teamRepository);
  const teamController = new CreateTeamController(teamUseCase);

  return teamController;
};
