import express from 'express';
import bodyParser from 'body-parser';
import { matchRoutes } from './routes/match.routes';

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use('/match', matchRoutes);

app.listen(PORT, () => {
  console.log(`Server listen http://localhost:${PORT}`);
});
