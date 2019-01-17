/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  product() {
    return this.hasMany('App/Models/Product');
  }

  attr() {
    return this.hasMany('App/Models/Attribute');
  }
}

module.exports = Category;
