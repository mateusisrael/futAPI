import { TeamRepository } from '../../../Team/repositories/teamRepository';
import { ListTeamController } from './listTeamController';
import { ListTeamUseCase } from './listTeamUseCase';

export default (): ListTeamController => {
  const teamRepository = new TeamRepository();
  const listTeamsUseCase = new ListTeamUseCase(teamRepository);
  const listTeamController = new ListTeamController(listTeamsUseCase);

  return listTeamController;
};
