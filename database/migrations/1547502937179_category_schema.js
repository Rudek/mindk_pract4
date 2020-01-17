/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    this.create('categories', table => {
      table.increments();
      table.string('name', 30).notNullable();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CategorySchema;
