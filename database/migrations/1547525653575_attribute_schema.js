/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AttributeSchema extends Schema {
  up() {
    this.create('attributes', table => {
      table.increments();
      table.string('name', 60).notNullable();
      table
        .integer('category_id')
        .notNullable()
        .index();
      table
        .foreign('category_id')
        .references('id')
        .on('categories')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('attributes');
  }
}

module.exports = AttributeSchema;
