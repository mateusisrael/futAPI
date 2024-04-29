import { ICreateMatchDTO } from '../../../@types';
import { Match } from '../../model/Match';
import { IMatchRepository } from '../../repositories/implementation/IMatchRepository';

export class CreateMatchUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  execute({ principalTeam, guestTeam, round, date }: ICreateMatchDTO) {
    const match = new Match(principalTeam, guestTeam, round, date);

    return this.matchRepository.create(match);
  }
}
