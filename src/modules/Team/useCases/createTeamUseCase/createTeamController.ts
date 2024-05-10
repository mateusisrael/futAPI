import { Request, Response } from 'express';
import { CreateTeamUseCase } from './createTeamUseCase';

export class CreateTeamController {
  constructor(private useCase: CreateTeamUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const teamObj = req.body;

    try {
      this.useCase.execute(teamObj);
      return res.status(201).json();
    } catch (error) {
      return res.status(400).json();
    }
  }
}
