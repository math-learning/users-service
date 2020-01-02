
exports.seed = async (knex) => {
  const currentRows = await knex('users').select();

  if (currentRows.length) {
    return;
  }

  // Professors
  const lucas = {
    email: 'lludueno@fi.uba.ar',
    name: 'Lucas Ludueño',
    role: 'professor',
    user_id: '111975156652135962164'
  };
  const diego = {
    email: 'diego@fi.uba.ar',
    name: 'Diego Kim',
    role: 'professor',
    user_id: '117307029770597899245'
  };
  const mendez = {
    email: 'mendez@fi.uba.ar',
    name: 'Mariano Mendez',
    role: 'professor',
    user_id: 'mendez-id'
  };
  const juanma = {
    email: 'juanma@fi.uba.ar',
    name: 'Juan Manuel Fernandez Caeiro',
    role: 'professor',
    user_id: 'juanma-id'
  };

  // Students
  const licha = {
    email: 'licha@fi.uba.ar',
    name: 'Lisandro Lopez',
    role: 'student',
    user_id: 'licha-id'
  };
  const pillud = {
    email: 'pillud@fi.uba.ar',
    name: 'Ivan Pillud',
    role: 'student',
    user_id: 'pillud-id'
  };

  await knex('users').insert([
    lucas,
    diego,
    mendez,
    juanma,
    licha,
    pillud
  ]);
};
