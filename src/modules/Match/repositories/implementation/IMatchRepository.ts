import { Match } from '@modules/Match/entities/Match';

export interface IMatchRepository {
  create(match: Match): Promise<Match>;
  // Não deve ser possível alterar o id da partida
  update(match: Match): Promise<Match | undefined>;
  find(id?: string): Promise<Match | Match[] | undefined>;
}
