import { TeamDTO, TeamName } from '../../@types';
import { ITeam } from '../entities/Team';
import { ITeamRepository } from './implementation/ITeamRepository';

export class TeamRepository implements ITeamRepository {
  private static INSTANCE: TeamRepository;
  private repository: Array<TeamDTO>;

  private constructor() {
    this.repository = [];
  }

  public static getInstance(): TeamRepository {
    if (!TeamRepository.INSTANCE) {
      TeamRepository.INSTANCE = new TeamRepository();
    }

    return TeamRepository.INSTANCE;
  }

  create(team: TeamDTO) {
    this.repository.push(team);
    return team;
  }

  findByName(name: string): ITeam | undefined {
    const team = this.repository.find((i) => i.name === name);
    if (!!team) {
      return {
        id: team.id,
        name: new TeamName(team.name),
      };
    }
  }
}
