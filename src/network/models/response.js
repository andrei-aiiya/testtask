module.exports = class Response {
  constructor(logger) {
    this._log = logger.getLogger('network/models/Response');
  }

  getTimestamp() {
    return Date.now().toString();
  }

  responseStatus(req, res, status = 500) {
    return res.status(status);
  }

  formattedSuccessResponse(req, res, data, status) {
    return this
      .responseStatus(req, res, (status || 200))
      .contentType('application/json')
      .json({
        ...data,
        // timestamp: this.getTimestamp(),
      });
  }

  formattedErrorResponse(res, req, message, status) {
    status = status || 500;
    const error = {
      code: status,
      message,
      method: req.method,
      endpoint: req.originalUrl,
    };
    this._log.warn(error);
    return this
      .responseStatus(req, res, status)
      .contentType('application/json')
      .json({
        status: 'fail',
        error,
        timestamp: this.getTimestamp(),
      });
  }
};
