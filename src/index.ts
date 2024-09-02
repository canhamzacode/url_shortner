import express from 'express';
import { logger } from './services';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
