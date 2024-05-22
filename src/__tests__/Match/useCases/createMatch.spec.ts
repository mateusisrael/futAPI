import { InMemoryTeamRepository } from '../../../modules/Team/repositories/inMemoryRepository';
import { TeamName } from '../../../modules/@types';
import { InMemoryMatchRepository } from '../../../modules/Match/repositories/inMemoryMatchRepository';
import { CreateMatchUseCase } from '../../../modules/Match/useCases/createMatch/createMatchUseCase';
import { Team } from '../../../modules/Team/entities/Team';
import { CreateTeamUseCase } from '../../../modules/Team/useCases/createTeamUseCase/createTeamUseCase';
import { inMemoryScoreBoardRepository } from '../../../modules/Match/repositories/inMemoryScoreBoard';

const teamRepository = InMemoryTeamRepository.getInstance();
const matchRepository = InMemoryMatchRepository.getInstance();
const scoreBoardRepository = inMemoryScoreBoardRepository.getInstance();
const teamUseCase = new CreateTeamUseCase(teamRepository);

// teamUseCase.execute('Flamengo');
// teamUseCase.execute('Fluminense');

describe('Create Match', () => {
  test('Should be able to create a match', async () => {
    await teamUseCase.execute('Flamengo');
    await teamUseCase.execute('Fluminense');

    const principalTeam = await teamRepository.findByName('Flamengo');
    const guestTeam = await teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const date = new Date();

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository,
      scoreBoardRepository
    );

    let match;

    if (!!principalTeam && !!guestTeam) {
      match = await matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: new Date(date.setDate(date.getDate() + 2)),
      });
    }

    expect(match).toHaveProperty('id');
  });

  test("Should be initiate a match with 'NAO_INICIADA' status", async () => {
    const principalTeam = await teamRepository.findByName('Flamengo');
    const guestTeam = await teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const date = new Date();

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository,
      scoreBoardRepository
    );

    let match;
    if (!!principalTeam && !!guestTeam) {
      match = await matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: new Date(date.setDate(date.getDate() + 2)),
      });
    }
    expect(match?.status).toEqual('NAO_INICIADA');
  });

  test('Should be initiate a match with reseted points', async () => {
    const principalTeam = await teamRepository.findByName('Flamengo');
    const guestTeam = await teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const date = new Date();

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository,
      scoreBoardRepository
    );

    let match;
    if (!!principalTeam && !!guestTeam) {
      match = await matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: new Date(date.setDate(date.getDate() + 2)),
      });
    }

    expect(match?.scoreBoard.principalTeamPoints).toEqual(0);
    expect(match?.scoreBoard.principalTeamPoints).toEqual(0);
  });

  test('Should not be able to create a match with a past date', async () => {
    const principalTeam = await teamRepository.findByName('Flamengo');
    const guestTeam = await teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const now = new Date();
    const date = new Date(
      `${now.getFullYear() - 1}-${now.getMonth()}-${now.getDay()}`
    );

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository,
      scoreBoardRepository
    );

    let match;

    expect(async () => {
      if (!!principalTeam && !!guestTeam) {
        match = await matchUseCase.execute({
          principalTeam,
          guestTeam,
          round: 0,
          date: date,
        });
      }
    }).rejects.toThrow(Error('Data de partida Inválida'));
  });
  test('Should not be able to create a match with a not created team', () => {
    const notSavedInRepository = {
      principalTeam: new Team(new TeamName('Bahia')),
      guestTeam: new Team(new TeamName('Internacional')),
    };

    const date = new Date();

    const matchRepository = InMemoryMatchRepository.getInstance();
    const teamRepository = InMemoryTeamRepository.getInstance();
    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository,
      scoreBoardRepository
    );

    expect(async () => {
      await matchUseCase.execute({
        principalTeam: notSavedInRepository.principalTeam,
        guestTeam: notSavedInRepository.guestTeam,
        round: 0,
        date: new Date(date.setDate(date.getDate() + 2)),
      });
    }).rejects.toThrow(
      Error(
        'Time mandante não encontrado na base de dados' ||
          'Time convidado não encontrado na base de dados'
      )
    );
  });
  // test('Should not be able to create a match with round is great than 2', () => {});
  // test('Round should be greate than or equal 0', () => {});
});
