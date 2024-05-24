import { IScoreBoardRepository } from './implementation/IScoreBoardRepository';
import { ScoreBoard } from '../entities/Scoreboard';

export class inMemoryScoreBoardRepository implements IScoreBoardRepository {
  private repository: Array<ScoreBoard>;
  private static INSTANCE: IScoreBoardRepository;

  private constructor() {
    this.repository = [];
  }

  public static getInstance(): IScoreBoardRepository {
    if (!inMemoryScoreBoardRepository.INSTANCE) {
      inMemoryScoreBoardRepository.INSTANCE =
        new inMemoryScoreBoardRepository();
    }

    return inMemoryScoreBoardRepository.INSTANCE;
  }

  async create(scoreBoard: ScoreBoard) {
    this.repository.push(scoreBoard);
    return scoreBoard;
  }

  async update(scoreBoard: ScoreBoard) {
    const scoreBoardIndex = this.repository.findIndex(
      (i: ScoreBoard) => i.id === scoreBoard.id
    );

    if (scoreBoardIndex >= 0) {
      const findedRepository = this.repository[scoreBoardIndex];
      this.repository[scoreBoardIndex] = {
        ...scoreBoard,
        id: findedRepository.id,
      };

      return this.repository[scoreBoardIndex];
    }
    return undefined;
  }

  async find(id?: string) {
    if (!id) return this.repository;
    return this.repository.find((i: ScoreBoard) => i.id === id);
  }
}
