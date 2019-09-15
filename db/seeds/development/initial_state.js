
exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    { user_id: 1, name: 'Diego' },
    { user_id: 2, name: 'Lucas' },
    { user_id: 3, name: 'Mariano' }
  ]);
};
