class AuthUser {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    };
  }
}

module.exports = AuthUser;
