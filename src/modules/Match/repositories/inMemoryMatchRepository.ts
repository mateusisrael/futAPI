import { Match } from '../entities/Match';
import { IMatchRepository } from './implementation/IMatchRepository';

export class InMemoryMatchRepository implements IMatchRepository {
  private repository: Array<Match>;
  private static INSTANCE: IMatchRepository;

  private constructor() {
    this.repository = [];
  }

  public static getInstance(): IMatchRepository {
    if (!InMemoryMatchRepository.INSTANCE) {
      InMemoryMatchRepository.INSTANCE = new InMemoryMatchRepository();
    }

    return InMemoryMatchRepository.INSTANCE;
  }

  async create(match: Match) {
    this.repository.push(match);
    return match;
  }

  async update(match: Match) {
    const matchIndex = this.repository.findIndex(
      (i: Match) => i.id === match.id
    );

    if (matchIndex >= 0) {
      const findedMatch = this.repository[matchIndex];
      this.repository[matchIndex] = {
        ...match,
        id: findedMatch.id,
      };

      return this.repository[matchIndex];
    }
    return undefined;
  }

  async find(id?: string) {
    if (!id) return this.repository;
    return this.repository.find((i: Match) => i.id === id);
  }
}
