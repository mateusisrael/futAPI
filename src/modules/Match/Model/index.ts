import { ITeam, TeamName } from '../../Team/Model';

type TeamScore = {
  timeId: string;
  name: TeamName;
  points: number;
};

type ScoreBoard = {
  principalTeam: TeamScore;
  guestTeam: TeamScore;
};

export interface Match {
  id: string;
  principalTeam: ITeam;
  guestTeam: ITeam;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}
