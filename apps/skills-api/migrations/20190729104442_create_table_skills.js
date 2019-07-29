
exports.up = function (knex, Promise) {
  return knex.schema.createTable('skills', table => {
    table.increments('id');
    table.string('name', 255).notNullable();

    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('skills');
};
