const expressify = require('expressify')();
const usersService = require('../services/usersService');
const logger = require('../utils/logger.js');

/**
 * Get users profile.
 *
 */
const getUserProfile = async (req, res) => {
  logger.onLog('Request:', `${req.method} ${req.url}`);

  const profile = await usersService.getUserProfile({
    context: req.context,
    userId: req.params.userId
  });
  return res.status(200).json(profile);
};

module.exports = expressify({
  getUserProfile
});
