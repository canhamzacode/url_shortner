import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;
