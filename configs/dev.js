const resolveDbHost = () => {
  const { DOCKER } = process.env;
  return DOCKER ? 'users-db' : 'localhost';
};

module.exports = {
  app: {
    protocol: 'http',
    hostname: 'localhost',
    port: '7000'
  },
  db: {
    client: 'pg',
    version: '10.10',
    connection: {
      host: resolveDbHost(),
      user: 'postgres',
      password: 'postgres',
      database: 'users_service'
    }
  }
};
