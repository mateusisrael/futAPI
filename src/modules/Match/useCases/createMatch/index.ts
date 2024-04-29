import { MatchRepository } from '../../repositories/matchRepository';
import { CreateMatchController } from './createMatchController';
import { CreateMatchUseCase } from './createMatchUseCase';

export default (): CreateMatchController => {
  const repository = MatchRepository.getInstance();
  const useCase = new CreateMatchUseCase(repository);
  const controller = new CreateMatchController(useCase);

  return controller;
};
