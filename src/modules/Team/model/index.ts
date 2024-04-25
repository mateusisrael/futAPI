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

export interface ITeam {
  id: number;
  name: TeamName;
}

export class Team implements ITeam {
  id: number;
  name: TeamName;

  constructor(name: TeamName) {
    this.id = Date.now();
    this.name = name;
  }
}
