import mongoose from 'mongoose';
import { logger } from '../services';

const connectDB = (url: string) => {
  try {
    return mongoose.connect(url);
  } catch (error) {
    logger.error(`Error connecting to DB: ${error}`);
  }
};

export { connectDB };
