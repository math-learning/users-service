const url = require('url');
const fetch = require('node-fetch');
const configs = require('../configs');

const baseUrl = url.format(configs.app);

const status = () => {
  const statusUrl = `${baseUrl}/ping`;

  return fetch(statusUrl);
};

const getProfile = async ({ userId, token }) => {
  const profileUrl = `${baseUrl}/users/${userId}/profile`;

  const response = await fetch(profileUrl, {
    headers: {
      authorization: token
    }
  });
  return { status: response.status, body: await response.json() };
};

function errorWrapper(funct) {
  return function inner(...args) {
    try {
      return funct(...args);
    } catch (err) {
      return err;
    }
  };
}

module.exports = {
  getProfile: errorWrapper(getProfile),
  status: errorWrapper(status)
};
