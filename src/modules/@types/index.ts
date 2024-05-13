import { Team } from '@modules/Team/entities/Team';
import { ScoreBoard } from '../Match/entities/Match';

export class TeamName {
  static readonly REGEX = /^[A-Z][a-zA-Z\s]*$/;

  readonly value: string;

  constructor(value: string) {
    console.log('value', value);
    this.value = value ?? '';
    if (!this.validate(this.value)) throw new Error('Nome de time inválido');
  }

  validate(value: string) {
    return TeamName.REGEX.test(value);
  }
}

export interface ICreateMatchDTO {
  principalTeam: TeamDTO;
  guestTeam: TeamDTO;
  round: number;
  date: Date;
}

export interface IMatchDTO {
  principalTeam: TeamDTO;
  guestTeam: TeamDTO;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}

export function teamToDTO(team: Team) {
  return {
    id: team.id,
    name: team.name,
  };
}

export interface TeamDTO {
  id: string;
  name: string;
}
