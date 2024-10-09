import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const colorsConfig = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'cyan',
};

const colorizer = winston.format.colorize({ all: true, colors: colorsConfig });

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(
    timestamp(),
    printf((info) => `${info.timestamp} ${colorizer.colorize(info.level, info.level)}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;
