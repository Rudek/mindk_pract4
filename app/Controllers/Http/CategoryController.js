const Category = use('App/Models/Category');
// const Database = use('Database');

class CategoryController {
  async show({ params }) {
    return Category.getCategAttrsById(params.id);
  }

  async showAll() {
    return Category.all();
  }

  async add({ request, response }) {
    const { name, attrs } = request.post();
    const category = await Category.saveCategAttrs(name, attrs);
    return response.status(201).send(category);
  }

  async update({ request, response, params }) {
    const { name, attrs } = request.post();
    const category = await Category.updateCategAttrs(params.id, name, attrs);
    return response.send(category);
  }

  async delete({ params, response }) {
    const category = await Category.findOrFail(params.id);
    await category.delete();
    return response.route('CategoryController.showAll');
  }
}

module.exports = CategoryController;
