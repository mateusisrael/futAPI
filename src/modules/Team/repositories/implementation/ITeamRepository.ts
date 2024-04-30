import { TeamDTO } from '../../../@types';

export interface ITeamRepository {
  create(team: TeamDTO): TeamDTO;
  findByName(name: string): TeamDTO | undefined;
}
