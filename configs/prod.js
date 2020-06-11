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
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'users_service'
    }
  }
};
