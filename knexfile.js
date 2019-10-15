const devConfs = require('./configs/development');
const testConfs = require('./configs/test');

module.exports = {
  development: {
    ...devConfs.db,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    useNullAsDefault: true
  },
  test: {
    ...testConfs.db,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
