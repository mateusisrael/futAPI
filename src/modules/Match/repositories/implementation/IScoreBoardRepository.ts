import { ScoreBoard } from '@modules/Match/entities/Scoreboard';

export interface IScoreBoardRepository {
  create(scoreBoard: ScoreBoard): Promise<ScoreBoard>;
  update(scoreBoard: ScoreBoard): Promise<ScoreBoard | undefined>;
  find(id?: string): Promise<ScoreBoard | ScoreBoard[] | undefined>;
}
