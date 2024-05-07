import { TeamDTO } from '../../../@types';
import { ITeam } from '../../entities/Team';

export interface ITeamRepository {
  create(team: TeamDTO): TeamDTO;
  findByName(name: string): ITeam | undefined;
}
