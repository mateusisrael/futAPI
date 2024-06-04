import { Repository } from 'typeorm';
import { postgresDataSource } from '../../../database/dataSource';
import { TeamDTO } from '../../@types';
import { ITeamRepository } from './implementation/ITeamRepository';
import { Team } from '../entities/Team';

export class TeamRepository implements ITeamRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = postgresDataSource.getRepository(Team);
  }

  async create(team: Team): Promise<void> {
    const createdTeam = this.repository.create(team);
    await this.repository.save(createdTeam);
  }

  async findByName(name: string): Promise<Team | null> {
    const team = await this.repository.findOneBy({ name });
    return team;
  }

  async find(id: string): Promise<Team | null> {
    return await this.repository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.emblem', 'emblem')
      .where('team.id = :id', { id: id })
      .getOne();
  }

  async list(): Promise<Team[]> {
    return this.repository.find();
  }

  async save(team: Team): Promise<void> {
    await this.repository.save(team);
  }
}
