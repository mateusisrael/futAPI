import { TeamDTO } from '../../@types';
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

  findByName(name: string) {
    return this.repository.find((i) => i.name === name);
  }
}
