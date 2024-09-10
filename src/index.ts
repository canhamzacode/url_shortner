import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { logger } from './services';
import { connectDB } from './db/connect';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', router);

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
