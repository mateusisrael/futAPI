import { TeamName } from '../../../modules/@types';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  constructor(name: TeamName) {
    if (!this.id) {
      this.id = uuid();
    }
    this.name = name?.value;
  }
}
