import { TeamRepository } from '../../../Team/repositories/teamRepository';
import { MatchRepository } from '../../repositories/matchRepository';
import { CreateMatchController } from './createMatchController';
import { CreateMatchUseCase } from './createMatchUseCase';

export default (): CreateMatchController => {
  const matchRepository = MatchRepository.getInstance();
  const teamRepository = TeamRepository.getInstance();
  const useCase = new CreateMatchUseCase(matchRepository, teamRepository);
  const controller = new CreateMatchController(useCase);

  return controller;
};
