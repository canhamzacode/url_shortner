import mongoose from 'mongoose';
import { logger } from '../services';

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    logger.info('Connected to DB');
  } catch (error) {
    logger.error(`Error connecting to DB: ${error}`);
  }
};

export { connectDB };
