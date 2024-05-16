import { Request, Response } from 'express';
import { CreateTeamUseCase } from './createTeamUseCase';

export class CreateTeamController {
  constructor(private useCase: CreateTeamUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    return this.useCase
      .execute(name)
      .then((team) => {
        return res.status(201).json(team);
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  }
}
