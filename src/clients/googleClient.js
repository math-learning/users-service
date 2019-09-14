const fetch = require('node-fetch');

const authenticate = async ({ context }) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: context.token
  };

  const response = await fetch('https://google.com/auth', {
    headers
  });

  if (response.status >= 300) {
    return Promise.reject();
  }
  return response.json();
};

module.exports = {
  authenticate
};
