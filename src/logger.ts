import * as winston from 'winston';
import {format} from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({stack: true}),
      format.splat(),
      format.json()
  ),
  transports: [
    new winston.transports.Console(), //

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({filename: 'logs/app.log'}),
  ],
});


