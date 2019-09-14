const fetch = require('node-fetch');
const requestUtils = require('../utils/requestUtils');

const authenticate = async ({ context }) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: context.token
  };

  const response = await fetch('https://google.com/auth', {
    headers
  });

  return requestUtils.processResponse(response);
};

module.exports = {
  authenticate
};
