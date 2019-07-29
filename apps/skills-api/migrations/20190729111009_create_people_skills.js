
exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_skills', table => {
    table.increments('id');
    table.integer('personId').unsigned().notNullable().index();
    table.integer('skillId').unsigned().notNullable().index();
    table.string('level', 255).notNullable();

    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('people_skills');
};
