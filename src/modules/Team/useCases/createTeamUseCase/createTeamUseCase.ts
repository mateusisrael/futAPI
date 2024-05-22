import { TeamName, teamToDTO } from '../../../@types';
import { ITeamRepository } from '../../repositories/implementation/ITeamRepository';
import { Team } from '../../entities/Team';

export class CreateTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(name: string): Promise<Error | void> {
    try {
      const hasTeamWithSameName = await this.teamRepository.findByName(name);

      const team = new Team(new TeamName(name));

      if (!!hasTeamWithSameName) {
        throw new Error('Já existe um time com esse nome');
      } else {
        await this.teamRepository.create(team);
      }
    } catch (error) {
      throw error;
    }
  }
}
