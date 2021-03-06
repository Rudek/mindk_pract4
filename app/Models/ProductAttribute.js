/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProductAttribute extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  product() {
    return this.belongsTo('App/Models/Product');
  }

  attribute() {
    return this.belongsTo('App/Models/Attribute');
  }
}

module.exports = ProductAttribute;
