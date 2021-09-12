const config = require('config');
const { CronJob } = require('cron');
const collectorService = require('./collector_service');

const { template, tz } = config.get('cronConfig');

const job = new CronJob(
  template,
  () => collectorService.collect(),
  null,
  true,
  tz,
  null,
  true,
);
module.exports = job;
