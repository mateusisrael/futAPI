import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from './Team';

@Entity()
export class Emblem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Team, (team) => team.emblem)
  @JoinColumn()
  team: Team;

  @Column()
  path: string;

  constructor(path: string) {
    if (!this.id) {
      this.id = uuid();
    }
    this.path = path;
  }
}
