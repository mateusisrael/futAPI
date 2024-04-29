import { ITeam } from '../../../Team/entities/Team';
import { IMatch, ScoreBoard } from '../../entities/Match';

export interface IMatchRepository {
  create: (match: IMatch) => IMatch;
  update: (id: string, match: IMatch) => IMatch | void;
  // Não deve ser possível alterar o id da partida
  find: (id?: string) => IMatch | Array<IMatch> | undefined;
}
