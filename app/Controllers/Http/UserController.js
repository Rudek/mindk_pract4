const User = use('App/Models/User');
const Token = use('App/Models/Token');

class UserController {
  async login({ auth, request }) {
    const { email, password } = request.all();
    return auth.attempt(email, password);
  }
}

module.exports = UserController;
