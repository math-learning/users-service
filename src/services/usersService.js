const usersDB = require('../databases/usersDb');
const googleClient = require('../clients/googleClient');

/**
 * Get users profile.
 *
 */
const getUserProfile = async ({ context, userId }) => {
  await googleClient.authenticate({ context });
  const userProfile = await usersDB.getUserProfile({ context, userId });

  return userProfile;
};

module.exports = {
  getUserProfile,
};
