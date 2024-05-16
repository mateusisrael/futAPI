import { Team } from '@modules/Team/model/Team';
import { TeamName } from '../../@types';

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
  principalTeam: Team;
  guestTeam: Team;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}
