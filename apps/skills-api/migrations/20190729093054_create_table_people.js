
exports.up = function (knex, Promise) {
  return knex.schema.createTable('people', table => {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email', 255);

    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('people');
};
