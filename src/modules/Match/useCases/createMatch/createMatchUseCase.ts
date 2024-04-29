import { ITeam } from '../../../Team/model';
import { Match } from '../../model';
import { IMatchRepository } from '../../repositories/implementation/IMatchRepository';

export interface ICreateMatchDTO {
  principalTeam: ITeam;
  guestTeam: ITeam;
  round: number;
  date: Date;
}

export class CreateMatchUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  execute({ principalTeam, guestTeam, round, date }: ICreateMatchDTO) {
    const match = new Match(principalTeam, guestTeam, round, date);

    return this.matchRepository.create(match);
  }
}
