const configs = require('./dev');

module.exports = {
  ...configs,
  db: {
    ...configs.db,
    connection: {
      ...configs.db.connection,
      database: 'users_service_test'
    }
  }
};
