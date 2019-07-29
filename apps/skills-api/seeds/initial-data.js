
exports.seed = async function (knex, Promise) {
  await knex('people').del()
  await knex('people').insert([
    { id: 1, firstName: 'Arthur', lastName: 'Dent', email: 'towel@earth.com' },
    { id: 2, firstName: 'Thricia', lastName: 'McMillan', email: 'trillian@earth.com' },
  ]);

  await knex('skills').del()
  await knex('skills').insert([
    { id: 1, name: 'Shaving yaks' },
    { id: 2, name: 'Drinking tea' },
    { id: 3, name: 'Cursing' },
  ]);

  await knex('people_skills').del()
  await knex('people_skills').insert([
    { id: 1, level: 'Grand master', personId: 1, skillId: 2 },
    { id: 2, level: 'Professional', personId: 1, skillId: 3 },
    { id: 3, level: 'Amateur', personId: 2, skillId: 1 },
  ]);

};
