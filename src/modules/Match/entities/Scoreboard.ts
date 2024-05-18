import { Team } from '../../Team/entities/Team';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class ScoreBoard {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.id)
  principalTeamId: string;

  @ManyToOne(() => Team, (team) => team.id)
  guestTeamId: string;

  @Column()
  principalTeamPoints: number;

  @Column()
  guestTeamPoints: number;

  constructor(
    principalTeamId: string,
    guestTeamId: string,
    principalTeamPoints: number,
    guestTeamPoints: number
  ) {
    if (!this.id) {
      this.id = uuid();
    }
    this.principalTeamId = principalTeamId;
    this.guestTeamId = guestTeamId;
    this.principalTeamPoints = principalTeamPoints;
    this.guestTeamPoints = guestTeamPoints;
  }
}
