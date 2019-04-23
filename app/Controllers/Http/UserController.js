const User = use('App/Models/User');
const Token = use('App/Models/Token');

class UserController {
  async login({ auth, request }) {
    const { username, password } = request.all();
    return auth.attempt(username, password);
  }
}

module.exports = UserController;
