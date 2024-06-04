import { Request, Response } from 'express';
import { UploadEmblemUseCase } from './uploadEmblemUseCase';

export class UploadEmblemController {
  constructor(private useCase: UploadEmblemUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const teamName = req.params.name;

    return this.useCase
      .execute(teamName, req.file)
      .then(() => {
        return res.status(200).json();
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  }
}
