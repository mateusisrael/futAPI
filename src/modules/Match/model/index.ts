import { ITeam, TeamName } from '../../Team/model';
import { v4 as uuid, V4Options } from 'uuid';

type TeamScore = {
  timeId: string;
  name: TeamName;
  points: number;
};

type ScoreBoard = {
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
  principalTeam: ITeam;
  guestTeam: ITeam;
  date: Date;
  round: number;
  scoreBoard: ScoreBoard;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';

  constructor(
    principalTeam: ITeam,
    guestTeam: ITeam,
    round: number,
    date: Date
  ) {
    (this.id = uuid()),
      (this.principalTeam = principalTeam),
      (this.guestTeam = guestTeam),
      (this.date = date);
    (this.round = round), (this.status = 'Não iniciada');
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
