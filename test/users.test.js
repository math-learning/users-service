const { assert } = require('chai');
const requests = require('./utils/requests');
const mocks = require('./utils/mocks');
const { knex, cleanDb, sanitizeResponse } = require('./utils/db');

describe('Integration user tests', () => {
  let token;
  let error;
  let photo;
  let response;

  before(() => {
    photo = 'http://militohayunosolo.com';
    token = 'token';
    return cleanDb();
  });
  afterEach(() => cleanDb());

  describe('Get user', () => {
    let userId;

    beforeEach(() => {
      userId = 'fake';
    });

    describe('When the user exists', () => {
      let expectedUser;

      beforeEach(async () => {
        expectedUser = {
          userId, name: 'Pepe', email: 'pepe@gmail', role: 'student'
        };

        await knex('users').insert([
          {
            user_id: userId, name: 'Pepe', email: 'pepe@gmail', role: 'student'
          },
          {
            user_id: 2, name: 'Papo', email: 'papo@gmail', role: 'student'
          },
          {
            user_id: 3, name: 'Popo', email: 'popo@gmail', role: 'student'
          }
        ]);
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({});

        response = await requests.getProfile({ userId, token });
      });

      it('status is OK', () => assert.equal(response.status, 200));

      it('body has the user', () => assert.deepEqual(sanitizeResponse(response.body), expectedUser));
    });

    describe('When the user not exists', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ });

        response = await requests.getProfile({ userId, token });
      });

      it('status is Not found', () => assert.equal(response.status, 404));

      it('body has the error message', () => assert.deepEqual(sanitizeResponse(response.body), { message: 'User not found' }));
    });

    describe('When token is invalid', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ status: 401 });

        error = await requests.getProfile({ userId, token });
      });

      it('status is unauthorized', () => assert.equal(error.status, 401));
    });
  });

  describe('Get users profile', () => {
    let expectedUserProfiles;

    beforeEach(async () => {
      await knex('users').insert([
        {
          user_id: '1', name: 'Pepe', email: 'pepe@gmail', role: 'student'
        },
        {
          user_id: '2', name: 'Papo', email: 'papo@gmail', role: 'student'
        },
        {
          user_id: '3', name: 'Popo', email: 'popo@gmail', role: 'student'
        }
      ]);
    });

    describe('When the user exists', () => {
      beforeEach(async () => {
        expectedUserProfiles = [{
          userId: '1', name: 'Pepe', email: 'pepe@gmail', role: 'student'
        }, {
          userId: '2', name: 'Papo', email: 'papo@gmail', role: 'student'
        }];
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({});
        const userIds = [{ id: '1' }, { id: '2' }];

        response = await requests.getProfiles({ userIds, token });
      });

      it('status is OK', () => assert.equal(response.status, 200));

      it('body has the user profiles', () => assert.deepEqual(sanitizeResponse(response.body), expectedUserProfiles));
    });

    describe('When some user does not exists', () => {
      beforeEach(async () => {
        expectedUserProfiles = [{
          userId: '1', name: 'Pepe', email: 'pepe@gmail', role: 'student'
        }];
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({ });
        const userIds = [{ id: '1' }, { id: '4' }];

        response = await requests.getProfiles({ userIds, token });
      });

      it('status is OK', () => assert.equal(response.status, 200));

      it('body has the user profiles that have been found', () => assert.deepEqual(sanitizeResponse(response.body), expectedUserProfiles));
    });

    describe('When token is invalid', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ status: 401 });
        const userIds = [{ id: '1' }, { id: '2' }];

        error = await requests.getProfile({ userIds, token });
      });

      it('status is unauthorized', () => assert.equal(error.status, 401));
    });
  });

  describe('Login', () => {
    let userId;

    beforeEach(() => {
      userId = '123456';
    });

    describe('When the user exists', () => {
      let expectedUser;

      beforeEach(async () => {
        expectedUser = {
          userId, name: 'Pepe', email: 'pepe@gmail', role: 'student', photo
        };

        await knex('users').insert([
          {
            user_id: userId, name: 'Pepe', email: 'pepe@gmail', role: 'student'
          },
          {
            user_id: 2, name: 'Papo', email: 'papo@gmail', role: 'student'
          },
          {
            user_id: 3, name: 'Popo', email: 'popo@gmail', role: 'student'
          }
        ]);
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId, picture: photo } });

        response = await requests.login({ token });
      });

      it('status is OK', () => assert.equal(response.status, 200));

      it('body has the user', () => assert.deepEqual(sanitizeResponse(response.body), expectedUser));
    });

    describe('When the user not exists', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId } });

        response = await requests.login({ token });
      });

      it('status is Not found', () => assert.equal(response.status, 404));

      it('body has the error message', () => assert.deepEqual(sanitizeResponse(response.body), { message: 'User not found' }));
    });

    describe('When token is invalid', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ status: 401 });

        error = await requests.login({ token });
      });

      it('status is unauthorized', () => assert.equal(error.status, 401));
    });
  });

  describe('Signup', () => {
    let userId;
    let email;
    let name;
    let role;
    let userMetadata;

    beforeEach(() => {
      email = 'pepe@gmail';
      userId = '123456';
      name = 'user name';
      role = 'student';
      userMetadata = {
        name,
        role
      };
    });

    describe('When the user does not exist', () => {
      let expectedUser;

      beforeEach(async () => {
        expectedUser = {
          userId, email, ...userMetadata, photo
        };

        await knex('users').insert([
          {
            user_id: 2, name: 'Papo', email: 'papo@gmail', role: 'student'
          },
          {
            user_id: 3, name: 'Popo', email: 'popo@gmail', role: 'student'
          }
        ]);
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId, email, picture: photo } });

        response = await requests.signup({ token, userMetadata });
      });

      it('status is OK', () => assert.equal(response.status, 201));

      it('body has the created user', () => assert.deepEqual(sanitizeResponse(response.body), expectedUser));
    });

    describe('When the user already exists', () => {
      beforeEach(async () => {
        await knex('users').insert([
          {
            user_id: userId, name: 'Pepe', email: 'pepe@gmail', role: 'student'
          },
          {
            user_id: 2, name: 'Papo', email: 'papo@gmail', role: 'student'
          },
          {
            user_id: 3, name: 'Popo', email: 'popo@gmail', role: 'student'
          }
        ]);
      });

      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId, email } });

        error = await requests.signup({ token, userMetadata });
      });

      it('status is conflict', () => assert.equal(error.status, 409));
    });

    describe('When the role is not sent', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId, email } });

        error = await requests.signup({ token, userMetadata: { name } });
      });

      it('status is bad request', () => assert.equal(error.status, 400));
    });

    describe('When the role is invalid', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId, email } });

        error = await requests.signup({ token, userMetadata: { role: 'admin' } });
      });

      it('status is bad request', () => assert.equal(error.status, 400));
    });

    describe('When the name is not sent', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ response: { id: userId, email } });

        error = await requests.signup({ token, userMetadata: { role } });
      });

      it('status is bad request', () => assert.equal(error.status, 400));
    });

    describe('When token is invalid', () => {
      beforeEach(async () => {
        mocks.mockGoogleAuth({ status: 401 });

        error = await requests.signup({ token, userMetadata });
      });

      it('status is unauthorized', () => assert.equal(error.status, 401));
    });
  });
});
