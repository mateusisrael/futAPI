import { TeamName } from '../../@types';
import { ITeam } from '../../Team/entities/Team';

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
