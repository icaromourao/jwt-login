import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const timezoned = () => {
  return new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  });
};

const myFormat = format.combine(
  format.timestamp({ format: timezoned }), format.json(),
  format.printf((info) => {
    return JSON.stringify({
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
      meta: info.meta
    });
  })
);

const DailyRotateFileOpts = {
  filename: path.resolve('logs/%DATE%.log'),
  datePattern: 'DD-MM-YYYY',
  maxSize: '5m',
  maxFiles: '14d',
  frequency: '24h',
  auditFile: path.resolve('logs/audit-file.json')
};

const DailyRotateErrorFileOpts = {
  level: 'error',
  filename: path.resolve('logs/%DATE%-error.log'),
  datePattern: 'DD-MM-YYYY',
  maxSize: '5m',
  maxFiles: '14d',
  frequency: '24h',
  auditFile: path.resolve('logs/audit-file.json')
};

const logger = createLogger({
  level: 'info',
  format: myFormat,
  transports: [
    new DailyRotateFile(DailyRotateFileOpts),
    new DailyRotateFile(DailyRotateErrorFileOpts)
  ],
});

const expressLoggerOpts = {
  transports: [
    new DailyRotateFile(DailyRotateFileOpts),
    new DailyRotateFile(DailyRotateErrorFileOpts)
  ],
  format: myFormat,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  headerBlacklist: ['authorization']
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.simple())
  }));
}

export { logger, expressLoggerOpts };
