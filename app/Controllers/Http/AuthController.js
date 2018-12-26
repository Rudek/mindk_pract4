class AuthController {
  async login({ request }) {
    console.log(request.param);
    return [{ key: 1 }, { key: 2 }, { key: 2 }];
  }
}

module.exports = AuthController;
