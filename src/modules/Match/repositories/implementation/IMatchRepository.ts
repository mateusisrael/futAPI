import { ITeam } from '../../../Team/model';
import { IMatch, ScoreBoard } from '../../model';

export interface IMatchDTO {
  principalTeam: ITeam;
  guestTeam: ITeam;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}

export interface IMatchRepository {
  create: (match: IMatch) => IMatch;
  update: (id: string, match: IMatch) => IMatch | void;
  // Não deve ser possível alterar o id da partida
  find: (id?: string) => IMatch | Array<IMatch> | undefined;
}
