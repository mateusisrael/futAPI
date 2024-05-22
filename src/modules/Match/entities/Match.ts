import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScoreBoard } from './Scoreboard';
import { v4 as uuid } from 'uuid';
import { Team } from '../../Team/entities/Team';

export enum MatchStatus {
  NAO_INICIADA = 'NAO_INICIADA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADA = 'FINALIZADA',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ScoreBoard, (scoreBoard) => scoreBoard.id, { cascade: true })
  scoreBoardId: string;

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

  @Index()
  @ManyToOne(() => Team, (team) => team.id)
  principalTeamId: string;

  @Index()
  @ManyToOne(() => Team, (team) => team.id)
  guestTeamId: string;

  constructor(
    principalTeamId: string,
    guestTeamId: string,
    round: number,
    date: Date,
    scoreBoardId: string
  ) {
    if (!this.id) {
      this.id = uuid();
    }
    this.scoreBoardId = scoreBoardId;
    this.status = MatchStatus.NAO_INICIADA;
    this.principalTeamId = principalTeamId;
    this.guestTeamId = guestTeamId;
    this.round = round;
    this.date = date;
  }
}
