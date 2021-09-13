const app = require('./network');
const db = require('./database');
const cronService = require('./services/cron_service');
const logger = require('./services/logger_service');

const log = logger.getLogger('main');

const init = async () => {
  await db.sequelize.sync({ force: true });
  log.info('Drop and re-sync db');
  await cronService.start();
  log.info('Cron service started');
};
init()
  .then(() => { log.info('Main service started');})
  .catch((e) => {
    log.fatal(e);
    process.exit(1);
  });
