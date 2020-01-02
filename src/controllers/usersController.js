const createError = require('http-errors');
const expressify = require('expressify')();
const usersService = require('../services/usersService');

/**
 * Login.
 *
 */
const login = async (req, res) => {
  const { googleProfile } = req.context;
  const userProfile = await usersService.login({
    context: req.context,
    userId: googleProfile.id
  });
  return res.status(200).json(userProfile);
};

/**
 * SignUp.
 *
 */
const signup = async (req, res) => {
  const availableRoles = ['professor', 'student'];
  const { context } = req;
  const { name, role } = req.body;
  const { email, id } = context.googleProfile;
  const userMetadata = {
    userId: id,
    name,
    role,
    email
  };

  if (!name || !role || !availableRoles.includes(role)) {
    return Promise.reject(createError.BadRequest('name or role have not been provided'));
  }

  await usersService.signup({
    context,
    userMetadata
  });
  return res.status(201).json(userMetadata);
};

/**
 * Get user.
 *
 */
const getUser = async (req, res) => {
  const profile = await usersService.getUser({
    context: req.context,
    userId: req.params.userId
  });
  return res.status(200).json(profile);
};

/**
 * Get users as bulk.
 *
 */
const getUsersAsBulk = async (req, res) => {
  const { userIds } = req.body;
  const profiles = await usersService.getUsersAsBulk({
    context: req.context,
    userIds
  });
  return res.status(200).json(profiles);
};

module.exports = expressify({
  login,
  signup,
  getUser,
  getUsersAsBulk
});
