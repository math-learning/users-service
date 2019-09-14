const { assert } = require('chai');
const requests = require('./requests');
const mocks = require('./mocks');

// Starts the app
require('../src/app.js');

describe('Integration user tests', () => {
  let error;
  let response;

  describe('Get user profile', () => {
    let userId;
    let token;

    beforeEach(() => {
      userId = 'fake';
      token = 'token';
    });

    describe('When everything is ok', () => {
      beforeEach(async () => {
        mocks.mockAuth({ token });

        response = await requests.getProfile({ userId, token });
      });

      it('status is OK', () => assert.equal(response.status, 200));

      it('body has the user profile', () => assert.deepEqual(response.body, { userId }));
    });

    describe.skip('When everything is NOT ok', () => {
      beforeEach(async () => {
        mocks.mockAuth({ token, status: 401 });

        error = await requests.getProfile({ userId, token });
      });

      it('status is unauthorized', () => assert.equal(error.status, 401));
    });
  });
});
