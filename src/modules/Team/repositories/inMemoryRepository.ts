import { TeamDTO } from '../../@types';
import { ITeamRepository } from './implementation/ITeamRepository';
import { Team } from '../entities/Team';
import { v4 as uuid } from 'uuid';

export class InMemoryTeamRepository implements ITeamRepository {
  private static INSTANCE: InMemoryTeamRepository;
  private repository: Array<Team>;

  private constructor() {
    this.repository = [];
  }

  public static getInstance(): InMemoryTeamRepository {
    if (!InMemoryTeamRepository.INSTANCE) {
      InMemoryTeamRepository.INSTANCE = new InMemoryTeamRepository();
    }

    return InMemoryTeamRepository.INSTANCE;
  }

  async create(team: Team): Promise<void> {
    this.repository.push(team);
  }

  async findByName(name: string): Promise<Team | null> {
    const team = this.repository.find((i) => i.name === name);
    if (!!team) {
      return team;
    } else {
      return null;
    }
  }

  async list(): Promise<Team[]> {
    return this.repository;
  }
}
