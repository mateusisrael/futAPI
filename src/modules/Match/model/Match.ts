import { ITeam } from '../../Team/entities/Team';
import { v4 as uuid } from 'uuid';
import { IMatch, ScoreBoard } from '../entities/Match';

export class Match implements IMatch {
  id: string;
  scoreBoard: ScoreBoard;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';

  constructor(
    public principalTeam: ITeam,
    public guestTeam: ITeam,
    public round: number,
    public date: Date
  ) {
    (this.id = uuid()), (this.status = 'Não iniciada');
    this.scoreBoard = {
      principalTeam: {
        timeId: principalTeam.id,
        name: principalTeam.name,
        points: 0,
      },
      guestTeam: {
        timeId: guestTeam.id,
        name: guestTeam.name,
        points: 0,
      },
    };
  }
}
