import { Request, Response } from 'express';
import { ListTeamUseCase } from './listTeamUseCase';

export class ListTeamController {
  constructor(private useCase: ListTeamUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const name = req.params.name;

    console.log('PARAMS', req.params);
    return this.useCase
      .execute(name)
      .then((teams) => {
        return res.status(200).json(teams);
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  }
}
