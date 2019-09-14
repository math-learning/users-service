const usersDB = require('../databases/usersDb');
const googleClient = require('../clients/googleClient');

/**
 * Get users profile.
 *
 */
const getUserProfile = async ({ context, userId }) => {
  await googleClient.authenticate({ context });
  const profile = await usersDB.getUserProfile({ context, userId });

  return profile;
};

module.exports = {
  getUserProfile,
};
