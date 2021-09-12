const config = require('config');
const express = require('express');
const cors = require('cors');
const logger = require('../services/logger_service');
const PriceController = require('./controllers/price_controller');

const corsOptions = config.get('corsOptions');
const { port } = config.get('appConfig');
const log = logger.getLogger('http');
const app = express();

app.use(logger.connectLogger(log, {
  level: 'auto',
  statusRules: [
    {
      from: 200,
      to: 299,
      level: 'debug',
    },
    {
      from: 300,
      to: 399,
      level: 'info',
    },
    {
      from: 400,
      to: 999,
      level: 'warn',
    },
  ],
  format: (req, res, format) => format(`:remote-addr :method :url ${JSON.stringify(req.body)} ${res.statusCode === 500 ? Object.keys(res) : ''}`),
}));
app.use(cors(corsOptions));
app.use(express.json());

// Init endpoints
const priceController = new PriceController(app);
app.use('/service', priceController.getRouter());

const server = app.listen(port, () => {
  log.info(`Server is running on port ${port}`);
});

const closeProcess = (signal) => {
  log.debug(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    log.debug('HTTP server closed');
  });
};

process
  .on('SIGINT', closeProcess)
  .on('SIGTERM', closeProcess)
  .on('SIGQUIT', closeProcess);

module.exports = app;
