const products = [
  { name: 'IPhone XS Max', price: 1000, color: 'black' },
  { name: 'Samsung Galaxy S10', price: 800, color: 'blue' },
  { name: 'OnePlus 7', price: 600, color: 'black' }
];

class ProductController {
  async show({ params }) {
    return products[params.id];
  }

  async showAll() {
    return products;
  }

  async add({ request }) {
    console.log(request);
    products.push(request.all());
    return products;
  }

  async update({ params, request }) {
    const product = request.all();
    products[params.id].name = product.name;
    products[params.id].price = product.price;
    products[params.id].color = product.color;
    return products;
  }

  async delete({ params }) {
    console.log(params);
    products.splice(params.id, 1);
    return products;
  }
}

module.exports = ProductController;
