import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ITeam, Team, TeamName } from './modules/Team/Model';

const PORT = 3000;

const app = express();

const teams: Array<ITeam> = [];

console.log('teste');

app.use(bodyParser.json());

app.get('/teams', (req, res) => {
  res.json({ data: teams }).send();
});

app.post('/teams', (req, res) => {
  const { name } = req.body;

  try {
    const teamName = new TeamName(name);
    teams.push(new Team(teamName));
    res.json({ message: 'Time criado' }).status(201).send();
  } catch (error) {
    res.json({ error: error }).status(400).send();
  }
});

app.get('/teams/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('id', id);
  const team = teams.find((t) => t.id === id);

  console.log({ team });
  if (!!team) {
    res.json({ data: team }).status(200).send();
    return;
  }
  res.json({ data: [] }).send();
});

app.listen(PORT, () => {
  console.log(`Server listen http://localhost:${PORT}`);
});
