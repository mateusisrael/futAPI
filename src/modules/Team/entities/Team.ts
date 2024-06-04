import { TeamName } from '../../../modules/@types';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Emblem } from './Emblem';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Emblem, (emblem) => emblem.team, { cascade: true })
  emblem: Emblem;

  constructor(name: TeamName) {
    if (!this.id) {
      this.id = uuid();
    }
    this.name = name?.value;
  }
}
