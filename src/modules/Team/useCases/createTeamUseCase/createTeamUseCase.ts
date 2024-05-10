import { TeamDTO, TeamName, teamToDTO } from '../../../@types';
import { ITeamRepository } from '../../repositories/implementation/ITeamRepository';
import { Team } from '../../model/Team';

export class CreateTeamUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  execute(name: string): TeamDTO | Error {
    const teamName = new TeamName(name);
    const hasTeamWithSameName = this.teamRepository.findByName(name);

    const team = new Team(teamName);

    if (!!hasTeamWithSameName) {
      throw new Error('Já existe um time com esse nome');
    } else {
      this.teamRepository.create(teamToDTO(team));
      return teamToDTO(team);
    }
  }
}
