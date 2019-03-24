const Attribute = use('App/Models/Attribute');

class AttributeController {
  async show({ params }) {
    return Attribute.findOrFail(params.id);
  }

  async showAll() {
    return Attribute.all();
  }

  async add({ request, response }) {
    const attribute = await Attribute.create(request.only(['name', 'category_id']));
    return response.status(201).send(attribute);
  }

  async update({ params, request }) {
    const attribute = await Attribute.findOrFail(params.id);
    attribute.merge(request.only(['name', 'category_id']));
    await attribute.save();
    return attribute;
  }

  async delete({ params, response }) {
    const attribute = await Attribute.findOrFail(params.id);
    await attribute.delete();
    return response.status(204).send();
  }
}

module.exports = AttributeController;
