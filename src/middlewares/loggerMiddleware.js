const logger = require('../utils/logger.js');

module.exports = (err, req, res, next) => {
  if (err) {
    logger.onError(req.url, res, err);

    return res.status(err.status || 500).json({ message: err.message });
  }
  return next();
};
