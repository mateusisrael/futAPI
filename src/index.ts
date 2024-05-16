import express from 'express';
import bodyParser from 'body-parser';
import { matchRoutes } from './routes/match.routes';
import { teamRoutes } from './routes/team.routes';
import { postgresDataSource } from './database/dataSource';
import 'reflect-metadata';

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use('/match', matchRoutes);
app.use('/team', teamRoutes);

postgresDataSource
  .initialize()
  .then(() => {
    console.log('DataSource Initialized');

    app.listen(PORT, () => {
      console.log(`Server listen http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log('\n\nErro ao conectar com o banco de dados\n', e);
  });
