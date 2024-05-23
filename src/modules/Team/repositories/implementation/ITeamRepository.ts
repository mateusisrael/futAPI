import { Team } from '@modules/Team/entities/Team';

export interface ITeamRepository {
  create(team: Team): Promise<void>;
  findByName(name: string): Promise<Team | null | Error>;
  list(): Promise<Team[]>;
}
