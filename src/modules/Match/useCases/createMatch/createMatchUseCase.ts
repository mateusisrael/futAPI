import { ICreateMatchDTO } from '../../../@types';
import { ITeamRepository } from '../../../Team/repositories/implementation/ITeamRepository';
import { TeamRepository } from '../../../Team/repositories/teamRepository';
import { Match } from '../../model/Match';
import { IMatchRepository } from '../../repositories/implementation/IMatchRepository';

export class CreateMatchUseCase {
  constructor(
    private matchRepository: IMatchRepository,
    private teamRepository: ITeamRepository
  ) {}

  execute({ principalTeam, guestTeam, round, date }: ICreateMatchDTO) {
    if (date < new Date()) {
      throw new Error('Data Inválida');
    }

    if (!this.teamRepository.findByName(principalTeam.name.value)) {
      throw new Error('Time mandante não encontrado na base de dados');
    }

    if (!this.teamRepository.findByName(guestTeam.name.value)) {
      throw new Error('Time convidado não encontrado na base de dados');
    }

    const match = new Match(principalTeam, guestTeam, round, date);

    return this.matchRepository.create(match);
  }
}
