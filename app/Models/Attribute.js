/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = require('./BaseModel');

class Attribute extends BaseModel {
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
    return this.hasMany('App/Models/Product').pivotModel('App/Models/ProductAttribute');
  }
}

module.exports = Attribute;
