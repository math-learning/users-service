const nock = require('nock');

const mockAuth = ({ token, status = 200, response = {} }) => {
  nock('https://google.com')
    .get('/auth')
    .matchHeader('Authorization', token)
    .reply(status, response);
};

module.exports = {
  mockAuth
};
