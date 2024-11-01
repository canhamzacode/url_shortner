import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
import { logger } from './services';
import { connectDB } from './db/connect';
import router from './routes';
import { HTTP_STATUS } from './utils';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1', router);
app.get('/', (_, res: Response) => {
  res.send('Welcome to the URL shortener API, Made by Hamzat Abdul-Muizz');
});
app.use((_, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND.code).send({ message: HTTP_STATUS.NOT_FOUND.message });
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
  }
};

startServer();
