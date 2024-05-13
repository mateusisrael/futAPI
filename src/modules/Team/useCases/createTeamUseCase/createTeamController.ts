import { Request, Response } from 'express';
import { CreateTeamUseCase } from './createTeamUseCase';

export class CreateTeamController {
  constructor(private useCase: CreateTeamUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      this.useCase.execute(name);
      return res.status(201).json();
    } catch (error) {
      return res.status(400).json();
    } finally {
      res.status(500);
    }
  }
}
