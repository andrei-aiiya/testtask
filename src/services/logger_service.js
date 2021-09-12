const log4js = require('log4js');

const log4jsConfigDefault = {
  disableClustering: true,
  appenders: {
    out: {
      type: 'stdout',
    },
    info: {
      type: 'file',
      filename: `./logs/testtask-info.log`,
      maxLogSize: 10485760,
      backups: 10,
    },
    warnFile: {
      type: 'file',
      filename: `./logs/testtask-warn.log`,
      maxLogSize: 10485760,
      backups: 10,
    },
    warn: {
      type: 'logLevelFilter',
      appender: 'warnFile',
      level: 'warn',
    },
  },
  categories: {
    default: { appenders: ['out', 'info', 'warn'], level: 'debug' },
  },
};

log4js.configure(log4jsConfigDefault);
module.exports = log4js;
