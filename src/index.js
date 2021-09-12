const cronService = require('./services/cron_service');
const db = require('./database');
const app = require('./network');
const logger = require('./services/logger_service');

const log = logger.getLogger('main');

const init = async () => {
  db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db');
  });
  cronService.start();
};
init()
  .then(() => { log.info('Service started');})
  .catch((e) => {
    log.fatal(e);
    process.exit(1);
  });
