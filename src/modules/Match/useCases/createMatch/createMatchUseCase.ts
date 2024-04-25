import { ITeam } from '../../../Team/model';
import { Match } from '../../model';

interface ICreateMatchUseCase {
  principalTeam: ITeam;
  guestTeam: ITeam;
  round: number;
  date: Date;
}

export class CreateMatchUseCase {
  execute({ principalTeam, guestTeam, round, date }: ICreateMatchUseCase) {
    const match = new Match(principalTeam, guestTeam, round, date);
  }
}
