const Product = use('App/Models/Product');
const AccessDeniedException = use('App/Exceptions/AccessDeniedException');

class IsOwner {
  async handle({ params, auth }, next) {
    const product = await Product.findOrFail(params.id);
    if (auth.user.id !== product.user_id) throw new AccessDeniedException();
    await next();
  }
}

module.exports = IsOwner;
