import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScoreBoard } from './Scoreboard';
import { v4 as uuid } from 'uuid';
import { Team } from '../../Team/entities/Team';

export enum MatchStatus {
  NAO_INICIADA = 'Não iniciada',
  EM_ANDAMENTO = 'Em andamento',
  FINALIZADA = 'Finalizada',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ScoreBoard, { cascade: true })
  scoreBoard: ScoreBoard;

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.NAO_INICIADA,
  })
  status: MatchStatus;

  @Column()
  date: Date;

  @Column()
  round: number;

  @ManyToOne(() => Team, (team) => team.id)
  principalTeamId: string;

  @ManyToOne(() => Team, (team) => team.id)
  guestTeamId: string;

  constructor(
    principalTeamId: string,
    guestTeamId: string,
    round: number,
    date: Date,
    scoreBoard: ScoreBoard
  ) {
    if (!this.id) {
      this.id = uuid();
    }
    this.scoreBoard = scoreBoard;
    this.status = MatchStatus.NAO_INICIADA;
    this.principalTeamId = principalTeamId;
    this.guestTeamId = guestTeamId;
    this.round = round;
    this.date = date;
  }
}
