import { v4 as uuid } from 'uuid';
import { TeamName } from '../../@types';
import { ITeam } from '../entities/Team';

export class Team implements ITeam {
  id: string;
  name: TeamName;

  constructor(name: TeamName) {
    this.id = uuid();
    this.name = name;
  }
}
