/* eslint no-console: 0 */
import winston from 'winston';
import fs from 'fs';

winston.emitErrs = true;

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

const env = process.env.NODE_ENV;
if (env !== 'development') {
  console.log('Removiendo logger a consola por performance');
  logger.remove(winston.transports.Console);
}
module.exports = logger;
