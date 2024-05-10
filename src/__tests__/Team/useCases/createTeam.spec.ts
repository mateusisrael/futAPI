import { Team } from '../../../modules/Team/model/Team';
import { TeamRepository } from '../../../modules/Team/repositories/teamRepository';
import { CreateTeamUseCase } from '../../../modules/Team/useCases/createTeamUseCase/createTeamUseCase';
import { TeamDTO } from '../../../modules/@types';

describe('Create Team', () => {
  it('Should be create a team', () => {
    const repository = TeamRepository.getInstance();
    const createTeamUseCase = new CreateTeamUseCase(repository);

    const teamName = 'Flamengo';

    const team = createTeamUseCase.execute(teamName);
    console.log(team);
    expect(team).toHaveProperty('name', 'Flamengo');
    expect(team).toHaveProperty('id');
  });

  it('Should not be create two teams with the same names', () => {
    expect.assertions(3);
    const repository = TeamRepository.getInstance();
    const createTeamUseCase = new CreateTeamUseCase(repository);

    const teamName = 'Vasco';

    const team1 = createTeamUseCase.execute(teamName);

    expect(team1).toHaveProperty('name', 'Vasco');
    expect(team1).toHaveProperty('id');

    expect(() => createTeamUseCase.execute(teamName)).toThrow(Error);
  });
});
