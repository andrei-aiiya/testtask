const appConfig = {
  apiUrl: 'https://min-api.cryptocompare.com',
  fsyms: ['BTC', 'XRP', 'ETH', 'BCH', 'EOS', 'LTC', 'XMR', 'DASH'],
  tsyms: ['USD', 'EUR', 'GBP', 'JPY', 'RUR'],
  attributes: ['CHANGE24HOUR', 'CHANGEPCT24HOUR', 'OPEN24HOUR', 'VOLUME24HOUR', 'VOLUME24HOURTO', 'LOW24HOUR', 'HIGH24HOUR', 'PRICE', 'SUPPLY', 'MKTCAP'],
  port: 8001,
};
const cronConfig = {
  template: '0 */2 * * * *', // At every 2nd minute.
  tz: 'Europe/Moscow',
};
const dbConfig = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'example',
  DB: 'testtask',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const corsOptions = {
  origin: 'http://localhost:3000',
};

module.exports = {
  appConfig,
  dbConfig,
  corsOptions,
  cronConfig,
};
