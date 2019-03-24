/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = require('./BaseModel')

class Product extends BaseModel {
  static boot() {
    super.boot();
  }

  static get updatedAtColumn() {
    return null;
  }

  category() {
    return this.belongsTo('App/Models/Category');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  attrs() {
    return this.hasMany('App/Models/ProductAttribute');
  }
}

module.exports = Product;
