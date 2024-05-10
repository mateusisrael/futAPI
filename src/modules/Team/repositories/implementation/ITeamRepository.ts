import { Team } from '@modules/Team/entities/Team';
import { TeamDTO } from '../../../@types';

export interface ITeamRepository {
  create(team: TeamDTO): Promise<void>;
  findByName(name: string): Promise<Team | null>;
}
