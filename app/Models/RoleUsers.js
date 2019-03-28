/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class RoleUsers extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  users() {
    return this.belongsTo('App/Models/User');
  }

  roles() {
    return this.belongsTo('App/Models/Role');
  }
}

module.exports = RoleUsers;
