const usersDB = require('../databases/usersDb');

const fillUserPhoto = ({ context, profile }) => {
  const { googleProfile } = context;

  return { ...profile, photo: googleProfile.picture };
};

/**
 * Login.
 *
 */
const login = async ({ context, userId }) => {
  const profile = await usersDB.getUser({ context, userId });

  return fillUserPhoto({ context, profile });
};

/**
 * SignUp.
 *
 */
const signup = async ({ context, userMetadata }) => (
  usersDB.createUser({ context, userMetadata })
);

/**
 * Get users profile.
 *
 */
const getUser = async ({ context, userId }) => (
  usersDB.getUser({ context, userId })
);

/**
 * Get users profile.
 *
 */
const getUsersAsBulk = async ({ context, userIds }) => {
  const ids = userIds.map((user) => user.id);

  return usersDB.getUsersByIds({ context, userIds: ids });
};

module.exports = {
  login,
  signup,
  getUser,
  getUsersAsBulk
};
