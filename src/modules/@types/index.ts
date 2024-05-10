import { ScoreBoard } from '../Match/entities/Match';
import { ITeam } from '../Team/entities/Team';

export class TeamName {
  static readonly REGEX = /^[A-Z][a-zA-Z\s]*$/;

  readonly value: string;

  constructor(value: string) {
    this.value = value ?? '';
    if (!this.validate(this.value)) throw new Error('Nome de time inválido');
  }

  validate(value: string) {
    return TeamName.REGEX.test(value);
  }
}

export interface ICreateMatchDTO {
  principalTeam: ITeam;
  guestTeam: ITeam;
  round: number;
  date: Date;
}

export interface IMatchDTO {
  principalTeam: ITeam;
  guestTeam: ITeam;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}

export function teamToDTO(team: ITeam) {
  return {
    id: team.id,
    name: team.name.value,
  };
}

export interface TeamDTO {
  id: string;
  name: string;
}