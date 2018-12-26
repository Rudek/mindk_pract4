const categories = [
  { name: 'phones', attrs: ['display', 'camera'] },
  { name: 'TV', attrs: [] },
  { name: 'washing machine', attrs: [] }
];

class CategoryController {
  async show({ params }) {
    return categories[params.id];
  }

  async showAll() {
    return categories;
  }

  async add({ request }) {
    console.log(categories);
    categories.push(request.all());
    return categories;
  }

  async update({ params, request }) {
    return categories;
  }

  async delete({ params }) {
    console.log(params);
    categories.splice(params.id, 1);
    return categories;
  }
}

module.exports = CategoryController;
