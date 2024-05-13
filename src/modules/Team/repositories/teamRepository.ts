import { Repository } from 'typeorm';
import { postgresDataSource } from '../../../database/dataSource';
import { TeamDTO, TeamName } from '../../@types';
import { ITeamRepository } from './implementation/ITeamRepository';
import { Team } from '../entities/Team';

export class TeamRepository implements ITeamRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = postgresDataSource.getRepository(Team);
  }

  async create(team: TeamDTO): Promise<void> {
    const user = this.repository.create(team);
    await this.repository.save(user);
  }

  async findByName(name: string): Promise<Team | null> {
    const team = await this.repository.findOneBy({ name });
    return team;
  }
}
