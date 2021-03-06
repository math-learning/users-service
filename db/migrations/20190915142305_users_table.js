exports.up = (knex) => {
  const query = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    create type user_role as enum('student', 'professor', 'admin');

    CREATE TABLE users(
      user_id CHARACTER VARYING(64) PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
      name    CHARACTER VARYING(128) NOT NULL,
      email   CHARACTER VARYING(256) NOT NULL,
      role    user_role NOT NULL
    )`;

  return knex.raw(query);
};

exports.down = (knex) => {
  const query = `
    DROP TABLE users;
    DROP TYPE user_role;
  `;

  return knex.raw(query);
};
