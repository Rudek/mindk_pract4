/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Attribute extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  category() {
    return this.belongsTo('App/Models/Category');
  }

  attrs() {
    return this.belongsToMany('App/Models/Product').pivotModel('App/Models/ProductAttribute');
  }
}

module.exports = Attribute;
