const { formatters } = use('Validator');

class UpdateCategory {
  get rules() {
    return {
      name: 'string|max:30',
      attrs: 'array|max:25',
      'attrs.*.id': 'integer',
      'attrs.*.name': 'required|string|max:30'
    };
  }

  get messages() {
    return {
      'name.max': 'Category name more then {{argument.0}}.',
      'attrs.max': 'Attribute count must be less or equals {{argument.0}}.',
      'attrs.array': 'Attributes must be an array.'
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }
}

module.exports = UpdateCategory;
