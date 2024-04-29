import { ITeam, TeamName } from '../../Team/model';
import { v4 as uuid } from 'uuid';

export type TeamScore = {
  timeId: string;
  name: TeamName;
  points: number;
};

export type ScoreBoard = {
  principalTeam: TeamScore;
  guestTeam: TeamScore;
};

export interface IMatch {
  id: string;
  principalTeam: ITeam;
  guestTeam: ITeam;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}

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
