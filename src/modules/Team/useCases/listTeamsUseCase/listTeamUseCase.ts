import { ITeamRepository } from '../../repositories/implementation/ITeamRepository';
import { Team } from '../../entities/Team';

export class ListTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(id: string): Promise<Error | Team | Team[]> {
    try {
      if (!!id) {
        const team = await this.teamRepository.find(id);
        if (!team) throw new Error('Time não encontrado');
        return team;
      }

      return this.teamRepository.list();
    } catch (error) {
      throw error;
    }
  }
}
