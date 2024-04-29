import { IMatch } from '../entities/Match';
import { IMatchRepository } from './implementation/IMatchRepository';

export class MatchRepository implements IMatchRepository {
  private repository: Array<IMatch>;
  private static INSTANCE: IMatchRepository;

  private constructor() {
    this.repository = [];
  }

  public static getInstance(): IMatchRepository {
    if (!MatchRepository.INSTANCE) {
      MatchRepository.INSTANCE = new MatchRepository();
    }

    return MatchRepository.INSTANCE;
  }

  create(match: IMatch) {
    this.repository.push(match);
    return match;
  }

  update(id: string, match: IMatch) {
    const matchIndex = this.repository.findIndex((i: IMatch) => i.id === id);

    if (matchIndex >= 0) {
      const findedMatch = this.repository[matchIndex];
      this.repository[matchIndex] = {
        ...match,
        id: findedMatch.id,
      };

      return this.repository[matchIndex];
    }
  }

  find(id?: string) {
    if (!id) return this.repository;
    return this.repository.find((i: IMatch) => i.id === id);
  }
}
