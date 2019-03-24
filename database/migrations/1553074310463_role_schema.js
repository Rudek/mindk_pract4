/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleSchema extends Schema {
  up() {
    this.create('roles', table => {
      table.increments();
      table
        .string('name', 20)
        .notNullable()
        .unique();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = RoleSchema;
