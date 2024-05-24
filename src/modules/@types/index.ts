import { Match } from '@modules/Match/entities/Match';
import { ScoreBoard } from '../Match/entities/Scoreboard';
import { Team } from '../Team/entities/Team';

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
  principalTeam: Team;
  guestTeam: Team;
  round: number;
  date: Date;
}

export interface MatchRequest {
  principalTeam: Team;
  guestTeam: Team;
  scoreBoard: ScoreBoard;
  date: Date;
  round: number;
  status: 'Não iniciada' | 'Em andamento' | 'Finalizada';
}

export function teamToDTO(team: Team) {
  return {
    name: team.name,
  };
}

export interface TeamDTO {
  name: string;
}
