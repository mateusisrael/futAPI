import { Team } from '../../../Team/entities/Team';
import { ITeamRepository } from '../../repositories/implementation/ITeamRepository';
import { Emblem } from '../../../Team/entities/Emblem';

export class UploadEmblemUseCase {
  constructor(private teamRepository: ITeamRepository) {}

  async execute(
    teamName: string,
    file: Express.Multer.File | undefined
  ): Promise<void> {
    try {
      if (!!teamName) {
        const team = await this.teamRepository.findByName(teamName);
        if (!team) throw new Error('Time não encontrado');
      }
      if (!file) throw new Error('Arquivo não recebido');

      const team = await this.teamRepository.findByName(teamName);

      if (team instanceof Team) {
        const emblem = new Emblem(file.filename);
        team.emblem = emblem;
        await this.teamRepository.save(team);
      } else throw Error('Time não encontrado');
    } catch (error) {
      throw error;
    }
  }
}
