const collectorService = require('./collector_service');
const config = require('config');
const logger = require('./logger_service');
const { CryptoCompare } = require('../database');

const log = logger.getLogger('api');
const { fsyms: fsymsAllowed, tsyms: tsymsAllowed, attributes } = config.get('appConfig');

class ApiService {
  async price(options) {
    let value = null;
    try {
      value = await collectorService.request().catch(() => null);
      if (!value) {
        const { data } = await CryptoCompare.getLastData();
        value = data;
      }
      return this._cast(value, options);
    } catch (e) {
      log.error('price', e);
      throw(e);
    }
  }

  _cast(value, options) {
    const { fsyms, tsyms } = options;
    return fsyms
      .filter(key => fsymsAllowed.includes(key))
      .reduce((obj, key) => {
        obj.RAW[key] = this._castTsyms(value.RAW[key], tsyms);
        obj.DISPLAY[key] = this._castTsyms(value.DISPLAY[key], tsyms);
        return obj;
      }, { RAW: {}, DISPLAY: {} });
  }

  _castTsyms(value, tsyms) {
    return tsyms
      .filter(key => tsymsAllowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = this._castAttributes(value[key]);
        return obj;
      }, {});
  }

  _castAttributes(value) {
    return attributes.reduce((obj, key) => {
      obj[key] = value[key];
      return obj;
    }, {});
  }
}

module.exports = new ApiService();
