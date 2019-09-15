const createError = require('http-errors');

const { processDbResponse } = require('../utils/dbUtils');
const configs = require('../../configs');
const knex = require('knex')(configs.db); // eslint-disable-line

/**
 * Get users profile.
 *
 */
const getUserProfile = async ({ userId }) => (
  knex('users')
    .select()
    .where('user_id', userId)
    .returning('*')
    .then(processDbResponse)
    .then((response) => {
      if (!response) {
        throw new createError.NotFound('User not found');
      }
      return response;
    })
);

module.exports = {
  getUserProfile,
};
