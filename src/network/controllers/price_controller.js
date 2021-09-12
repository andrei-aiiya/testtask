const { Router } = require('express');
const apiService = require('../../services/api_service');
const logger = require('../../services/logger_service');
const Response = require('../models/response');
const required = require('../../utils/required');

const log = logger.getLogger('price_controller');

class PriceController {
  constructor(app) {
    this._app = app;
    this._resp = new Response(logger);
    this._router = Router();
    if (this._router) {
      this._router.get('/price', this.getPrice.bind(this));
    }
  }

  getRouter() {
    return this._router;
  }

  async getPrice(req, res) {
    try {
      const {
        fsyms: p1 = required('fsyms parameters are required'),
        tsyms: p2 = required('tsyms parameters are required'),
      } = req.query;
      const fsyms = Array.isArray(p1) ? p1 : p1.split(',');
      const tsyms = Array.isArray(p2) ? p2 : p2.split(',');
      const result = await apiService.price({ fsyms, tsyms });
      this._resp.formattedSuccessResponse(req, res, result);
    } catch (e) {
      log.warn(e);
      this._resp.formattedErrorResponse(res, req, e.message || e, e.status || 500);
    }
  }
}

module.exports = PriceController;
