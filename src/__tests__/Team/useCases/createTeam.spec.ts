import { CreateTeamUseCase } from '../../../modules/Team/useCases/createTeamUseCase/createTeamUseCase';
import { InMemoryTeamRepository } from '../../../modules/Team/repositories/inMemoryRepository';

describe('Create Team', () => {
  it('Should be create a team', async () => {
    const repository = InMemoryTeamRepository.getInstance();
    const createTeamUseCase = new CreateTeamUseCase(repository);

    const teamName = 'Flamengo';

    await createTeamUseCase.execute(teamName);
    const createdTeam = await repository.findByName(teamName);

    expect(createdTeam).toHaveProperty('name', 'Flamengo');
    expect(createdTeam).toHaveProperty('id');
  });

  it('Should not be create two teams with the same names', async () => {
    expect.assertions(3);
    const repository = InMemoryTeamRepository.getInstance();
    const createTeamUseCase = new CreateTeamUseCase(repository);

    const teamName = 'Vasco';

    await createTeamUseCase.execute(teamName);

    const createdTeam = await repository.findByName(teamName);

    expect(createdTeam).toHaveProperty('name', 'Vasco');
    expect(createdTeam).toHaveProperty('id');

    expect(
      async () => await createTeamUseCase.execute(teamName)
    ).rejects.toThrow(Error);
  });
});
