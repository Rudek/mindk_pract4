/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = require('./BaseModel');

class Category extends BaseModel {
  static boot() {
    super.boot();
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  product() {
    return this.hasMany('App/Models/Product');
  }

  attrs() {
    return this.hasMany('App/Models/Attribute');
  }
}

module.exports = Category;
