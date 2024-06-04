import { Team } from '../../../Team/entities/Team';

export interface ITeamRepository {
  create(team: Team): Promise<void>;
  findByName(name: string): Promise<Team | null | Error>;
  list(): Promise<Team[]>;
  find(id: string): Promise<Team | null>;
  save(team: Team): Promise<void>;
}
