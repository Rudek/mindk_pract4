const Product = use('App/Models/Product');

class ProductController {
  constructor() {
    this.fields = ['name', 'price', 'category_id'];
  }

  async show({ params }) {
    return Product.getProductById(params.id);
  }

  async showAll({ request }) {
    return Product.filterProducts(request.get());
  }

  async add({ request, response, auth }) {
    const product = request.only(this.fields);
    const { attrs } = request.input('attrs', []);
    product.user_id = auth.user.id;
    response.status(201).send(Product.saveProduct(product, attrs));
  }

  async update({ params, request, auth }) {
    const product = request.only(this.fields);
    const { attrs } = request.only(['attrs']);
    product.user_id = auth.user.id;
    return Product.updateProduct(params.id, product, attrs);
  }

  async delete({ params, response }) {
    const product = await Product.findOrFail(params.id);
    await product.delete();
    return response.status(204).send(product);
  }
}

module.exports = ProductController;
