const config = require('config');
const Sequelize = require('sequelize');
const mysql2  = require('mysql2');
const ccModel = require('./models/cryptocompare.model.js');

const dbConfig = config.get('dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule: mysql2,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize
};

db.CryptoCompare = ccModel(sequelize, Sequelize);

module.exports = db;
