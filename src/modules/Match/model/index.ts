import { Team } from '../../Team/entities/Team';
import { v4 as uuid } from 'uuid';
import { MatchStatus } from '../entities/Match';
import { ScoreBoard } from '../entities/Scoreboard';

export type TeamScore = {
  timeId: string;
  name: string;
  points: number;
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
