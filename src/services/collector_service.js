const axios = require('axios').default;
const querystring = require('querystring');
const config = require('config');
const logger = require('./logger_service');
const { CryptoCompare } = require('../database');

const { apiUrl, fsyms, tsyms } = config.get('appConfig');
const log = logger.getLogger('collector');

class CollectorService {

  async collect() {
    try {
      const data = await this.request();
      const payload = {
        data,
      };
      await CryptoCompare.create(payload);
      log.info('collect', data);
    } catch (e) {
      log.warn('collect', e);
    }
  }

  async request() {
    const response = await this._request();
    return this._processing(response);
  }

  _processing(response) {
    const data = response.data || {};
    if (data.data) {
      return data.data;
    }
    if (response.status >= 200 && response.status <= 299) {
      return data;
    }
    log.warn(data);
    throw new Error(data.message || data.messages || `${response.statusCode} - "${response.statusMessage}"`);
  }

  _request() {
    const params = {
      fsyms,
      tsyms,
    };
    const opt = {
      url: `${apiUrl}/data/pricemultifull?${querystring.stringify(params)}`,
      method: 'GET',
      responseType: 'json',
      headers: {
        'User-Agent': 'testtask',
        'Content-Type': 'application/json',
      },
    };
    log.debug('request', opt.url);
    return axios(opt);
  }
}

module.exports = new CollectorService();
