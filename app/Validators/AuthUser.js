class AuthUser {
  get rules() {
    return {
      username: 'required',
      password: 'required'
    };
  }
}

module.exports = AuthUser;
