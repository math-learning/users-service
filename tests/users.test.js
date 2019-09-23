const { assert } = require('chai');
const requests = require('./utils/requests');
const mocks = require('./utils/mocks');
const { knex, cleanDb, sanitizeResponse } = require('./utils/db');

// Starts the app
require('../src/app.js');

describe.only('Integration user tests', () => {
  let error;
  let response;

  before(() => cleanDb());
  afterEach(() => cleanDb());

  describe('Get user profile', () => {
    let userId;
    let token;

    beforeEach(() => {
      userId = 'fake';
      token = 'token';
    });

    describe('When the user exists', () => {
      let expectedUser;

      beforeEach(async () => {
        expectedUser = {
          userId, name: 'Pepe', email: 'pepe@gmail', rol: 'student'
        };

        await knex('users').insert([
          {
            user_id: userId, name: 'Pepe', email: 'pepe@gmail', rol: 'student'
          },
          {
            user_id: 2, name: 'Papo', email: 'papo@gmail', rol: 'student'
          },
          {
            user_id: 3, name: 'Popo', email: 'popo@gmail', rol: 'student'
          }
        ]);
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({});

        response = await requests.getProfile({ userId, token });
      });

      it('status is OK', () => assert.equal(response.status, 200));

      it('body has the user profile', () => assert.deepEqual(sanitizeResponse(response.body), expectedUser));
    });

    describe('When the user not exists', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ });

        response = await requests.getProfile({ userId, token });
      });

      it('status is Not found', () => assert.equal(response.status, 404));

      it('body has the error message', () => assert.deepEqual(sanitizeResponse(response.body), { message: 'User not found' }));
    });

    describe('When Google service is unavailable', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ status: 401 });

        error = await requests.getProfile({ userId, token });
      });

      it('status is unauthorized', () => assert.equal(error.status, 401));
    });
  });
});
