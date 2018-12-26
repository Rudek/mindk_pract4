const attributes = [{ phones: ['display', 'camera'] }, { TV: ['display', 'smart TV'] }, { 'washing machine': [] }];

class AttributeController {
  async show({ params }) {
    return attributes[params.id];
  }

  async showAll() {
    return attributes;
  }

  async add({ request }) {
    console.log(attributes);
    attributes.push(request.all());
    return attributes;
  }

  async update() {
    return attributes;
  }

  async delete({ params }) {
    console.log(params);
    attributes.splice(params.id, 1);
    return attributes;
  }
}

module.exports = AttributeController;
