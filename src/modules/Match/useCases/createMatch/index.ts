import { inMemoryScoreBoardRepository } from '../../repositories/inMemoryScoreBoard';
import { InMemoryTeamRepository } from '../../../Team/repositories/inMemoryRepository';
import { InMemoryMatchRepository } from '../../repositories/inMemoryMatchRepository';
import { CreateMatchController } from './createMatchController';
import { CreateMatchUseCase } from './createMatchUseCase';

export default (): CreateMatchController => {
  const matchRepository = InMemoryMatchRepository.getInstance();
  const teamRepository = InMemoryTeamRepository.getInstance();
  const scoreBoardRepository = inMemoryScoreBoardRepository.getInstance();
  const useCase = new CreateMatchUseCase(
    matchRepository,
    teamRepository,
    scoreBoardRepository
  );
  const controller = new CreateMatchController(useCase);

  return controller;
};
