import { TeamDTO, TeamName, teamToDTO } from '../../../@types';
import { ITeamRepository } from '../../repositories/implementation/ITeamRepository';
import { Team } from '../../model/Team';

export class CreateTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(name: string): Promise<TeamDTO | Error | void> {
    try {
      const teamName = new TeamName(name);
      const hasTeamWithSameName = await this.teamRepository.findByName(name);

      const team = new Team(teamName);

      if (!!hasTeamWithSameName) {
        throw new Error('Já existe um time com esse nome');
      } else {
        const createdTeam = await this.teamRepository.create({
          name: team.name.value,
          id: '',
        });

        return createdTeam;
      }
    } catch (error) {
      throw error;
    }
  }
}
