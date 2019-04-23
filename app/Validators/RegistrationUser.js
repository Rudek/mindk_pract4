class RegistrationUser {
  get sanitizationRules() {
    return {
      username: 'trim',
      email: 'normalize_email|trim'
    };
  }

  get rules() {
    return {
      username: 'required|max:10',
      email: 'required|email|unique:users',
      password: 'required|min:5|max:12'
    };
  }
}

module.exports = RegistrationUser;
