/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductAttributeSchema extends Schema {
  up() {
    this.create('product_attributes', table => {
      table.increments();
      table
        .integer('product_id')
        .notNullable()
        .index();
      table
        .foreign('product_id')
        .references('id')
        .on('products')
        .onDelete('cascade');
      table
        .integer('attribute_id')
        .notNullable()
        .index();
      table
        .foreign('attribute_id')
        .references('id')
        .on('attributes')
        .onDelete('cascade');
      table.string('value', 255);
    });
  }

  async down() {
    this.drop('product_attributes');
  }
}

module.exports = ProductAttributeSchema;
