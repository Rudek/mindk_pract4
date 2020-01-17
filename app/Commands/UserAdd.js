const { Command } = require('@adonisjs/ace');

// const Database = use('Database');
const Role = use('App/Models/Role');
const User = use('App/Models/User');
const RegistrationUser = use('App/Validators/RegistrationUser');
const { validate, sanitize } = use('Validator');

class UserAdd extends Command {
  static get signature() {
    return 'user:add';
  }

  static get description() {
    return 'Create new user (role admin/user).';
  }

  async handle() {
    this.info('Create new user.');

    let roles = await Role.query()
      .setVisible(['slug', 'id'])
      .fetch();
    roles = roles.toJSON().map(role => ({ name: role.slug, value: role.id }));
    let user = {
      username: await this.ask('Enter the user name: '),
      email: await this.ask('Enter the user email: '),
      password: await this.secure('Enter the user password: ')
    };

    const registrationUser = new RegistrationUser();
    user = sanitize(user, registrationUser.sanitizationRules);
    const validation = await validate(user, registrationUser.rules);
    console.log(user);
    if (validation.fails()) {
      this.error(`${this.icon('error')} ${validation.messages()[0].message}`);
      process.exit(0);
    }
    process.exit(0);
    const roleId = await this.choice('Choose the user role:', roles);
    user = await User.create(user);
    await user.roles().attach(roleId);

    this.success(`${this.icon('success')} User ${user.username} have created.`);
  }
}

module.exports = UserAdd;
