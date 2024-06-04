import { TeamRepository } from '../../../Team/repositories/teamRepository';
import { UploadEmblemController } from './uploadEmblemController';
import { UploadEmblemUseCase } from './uploadEmblemUseCase';

export default (): UploadEmblemController => {
  const teamRepository = new TeamRepository();
  const uploadEmblemUseCase = new UploadEmblemUseCase(teamRepository);
  const uploadEmblemController = new UploadEmblemController(
    uploadEmblemUseCase
  );

  return uploadEmblemController;
};
