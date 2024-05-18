import { TeamName } from '../../../modules/@types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  _name: TeamName;

  constructor(name: string) {
    if (!this.id) {
      this.id = uuid();
    }
    this._name = new TeamName(name);
  }

  public get name(): string {
    return this._name.value;
  }
}
