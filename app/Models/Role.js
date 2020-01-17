/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  users() {
    return this.belongsToMany('App/Models/User').pivotModel('App/Models/RoleUsers');
  }
}

module.exports = Role;
