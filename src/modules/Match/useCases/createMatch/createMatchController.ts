import { Request, Response } from 'express';
import { CreateMatchUseCase } from './createMatchUseCase';
import { MatchRequest } from '../../../@types';

export class CreateMatchController {
  constructor(private useCase: CreateMatchUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const matchObj = req.body as MatchRequest;
    console.log(matchObj);
    // Fazer validação dos dados recebidos aqui

    try {
      this.useCase.execute(matchObj);
      return res.status(201).json();
    } catch (error) {
      return res.status(400).json();
    }
  }
}
