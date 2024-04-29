import { Request, Response } from 'express';
import { CreateMatchUseCase } from './createMatchUseCase';
import { IMatchDTO } from '../../repositories/implementation/IMatchRepository';

export class CreateMatchController {
  constructor(private useCase: CreateMatchUseCase) {
    this.useCase = useCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const matchObj = req.body as IMatchDTO;
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
