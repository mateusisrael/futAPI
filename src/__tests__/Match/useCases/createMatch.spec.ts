import { MatchRepository } from '../../../modules/Match/repositories/matchRepository';
import { CreateMatchUseCase } from '../../../modules/Match/useCases/createMatch/createMatchUseCase';
import { TeamRepository } from '../../../modules/Team/repositories/teamRepository';
import { CreateTeamUseCase } from '../../../modules/Team/useCases/createTeamUseCase';

const teamRepository = TeamRepository.getInstance();
const teamUseCase = new CreateTeamUseCase(teamRepository);

teamUseCase.execute('Flamengo');
teamUseCase.execute('Fluminense');

describe('Create Match', () => {
  test('Should be able to create a match', () => {
    const principalTeam = teamRepository.findByName('Flamengo');
    const guestTeam = teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const date = new Date();

    const matchRepository = MatchRepository.getInstance();
    const matchUseCase = new CreateMatchUseCase(matchRepository);

    if (!!principalTeam && !!guestTeam) {
      matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: date,
      });
    }
  });
  test("Should be initiate a match with 'Não iniciado' state", () => {});
  test('Should be initiate a match with reseted points', () => {});
  test('Should not be able to create a match with a past date', () => {});
  test('Should not be able to create a match with a not created team', () => {});
  test('Should not be able to create a match with round is great than 2', () => {});
});
