import { TeamName, teamToDTO } from '../../../@types';
import { ITeamRepository } from '../../repositories/implementation/ITeamRepository';
import { Team } from '../../entities/Team';

export class ListTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(name: string): Promise<Error | Team | Team[]> {
    try {
      if (!!name) {
        const team = await this.teamRepository.findByName(name);
        if (!team) throw new Error('Time não encontrado');
        return team;
      }

      return this.teamRepository.list();
    } catch (error) {
      throw error;
    }
  }
}
