exports.up = (knex) => {
  const query = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE users(
      id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id CHARACTER VARYING(256) NOT NULL,
      name    CHARACTER VARYING(128) NOT NULL
    )`;

  return knex.raw(query);
};

exports.down = (knex) => {
  const query = `
    DROP TABLE users`;

  return knex.raw(query);
};
