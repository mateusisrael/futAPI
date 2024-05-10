import { TeamName } from '../../../modules/@types';
import { MatchRepository } from '../../../modules/Match/repositories/matchRepository';
import { CreateMatchUseCase } from '../../../modules/Match/useCases/createMatch/createMatchUseCase';
import { Team } from '../../../modules/Team/model/Team';
import { TeamRepository } from '../../../modules/Team/repositories/teamRepository';
import { CreateTeamUseCase } from '../../../modules/Team/useCases/createTeamUseCase/createTeamUseCase';

const teamRepository = TeamRepository.getInstance();
const matchRepository = MatchRepository.getInstance();
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

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository
    );

    let match;

    if (!!principalTeam && !!guestTeam) {
      match = matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: date,
      });
    }

    expect(match).toHaveProperty('id');
  });

  test("Should be initiate a match with 'Não iniciada' status", () => {
    const principalTeam = teamRepository.findByName('Flamengo');
    const guestTeam = teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const date = new Date();

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository
    );

    let match;
    if (!!principalTeam && !!guestTeam) {
      match = matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: date,
      });
    }

    expect(match?.status).toEqual('Não iniciada');
  });

  test('Should be initiate a match with reseted points', () => {
    const principalTeam = teamRepository.findByName('Flamengo');
    const guestTeam = teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const date = new Date();

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository
    );

    let match;
    if (!!principalTeam && !!guestTeam) {
      match = matchUseCase.execute({
        principalTeam,
        guestTeam,
        round: 0,
        date: date,
      });
    }

    expect(match?.scoreBoard.principalTeam.points).toEqual(0);
    expect(match?.scoreBoard.guestTeam.points).toEqual(0);
  });
  test('Should not be able to create a match with a past date', () => {
    const principalTeam = teamRepository.findByName('Flamengo');
    const guestTeam = teamRepository.findByName('Fluminense');

    expect(principalTeam).toHaveProperty('id');
    expect(guestTeam).toHaveProperty('id');

    const now = new Date();
    const date = new Date(
      `${now.getFullYear() - 1}-${now.getMonth()}-${now.getDay()}`
    );

    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository
    );

    let match;

    expect(() => {
      if (!!principalTeam && !!guestTeam) {
        match = matchUseCase.execute({
          principalTeam,
          guestTeam,
          round: 0,
          date: date,
        });
      }
    }).toThrow(Error('Data Inválida'));
  });
  test('Should not be able to create a match with a not created team', () => {
    const notSavedInRepository = {
      principalTeam: new Team(new TeamName('Bahia')),
      guestTeam: new Team(new TeamName('Internacional')),
    };

    const date = new Date();

    const matchRepository = MatchRepository.getInstance();
    const teamRepository = TeamRepository.getInstance();
    const matchUseCase = new CreateMatchUseCase(
      matchRepository,
      teamRepository
    );

    expect(() => {
      matchUseCase.execute({
        principalTeam: notSavedInRepository.principalTeam,
        guestTeam: notSavedInRepository.guestTeam,
        round: 0,
        date: date,
      });
    }).toThrow(
      Error(
        'Time mandante não encontrado na base de dados' ||
          'Time convidado não encontrado na base de dados'
      )
    );
  });
  // test('Should not be able to create a match with round is great than 2', () => {});
  // test('Round should be greate than or equal 0', () => {});
});
