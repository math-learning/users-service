const usersDB = require('../databases/usersDb');

/**
 * Login.
 *
 */
const login = async ({ context, userId }) => (
  usersDB.getUser({ context, userId })
);

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
