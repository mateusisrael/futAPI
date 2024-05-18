import { Team } from '../../../Team/entities/Team';
import { ICreateMatchDTO } from '../../../@types';
import { ITeamRepository } from '../../../Team/repositories/implementation/ITeamRepository';
import { TeamRepository } from '../../../Team/repositories/teamRepository';
// import { Match } from '../../model/Match';
import { Match } from '../../entities/Match';
import { IMatchRepository } from '../../repositories/implementation/IMatchRepository';
import { error } from 'console';
import { ScoreBoard } from '../../entities/Scoreboard';

export class CreateMatchUseCase {
  constructor(
    private matchRepository: IMatchRepository,
    private teamRepository: ITeamRepository
  ) {}

  async execute({ principalTeam, guestTeam, round, date }: ICreateMatchDTO) {
    if (date < new Date()) {
      throw new Error('Data de partida Inválida');
    }

    if (!(await this.teamRepository.findByName(principalTeam.name))) {
      throw new Error('Time mandante não encontrado na base de dados');
    }

    await this.teamRepository
      .findByName(principalTeam.name)
      .then((team) => {
        if (!(team instanceof Team)) {
          console.log('TEEEAM', team);
          throw new Error('Time mandante não encontrado na base de dados');
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    await this.teamRepository
      .findByName(guestTeam.name)
      .then((team) => {
        if (!(team instanceof Team)) {
          throw new Error('Time convidado não encontrado na base de dados');
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    const scoreBoard = new ScoreBoard(principalTeam.id, guestTeam.id, 0, 0);
    const match = new Match(
      principalTeam.id,
      guestTeam.id,
      round,
      date,
      scoreBoard
    );

    return await this.matchRepository.create(match);
  }
}
