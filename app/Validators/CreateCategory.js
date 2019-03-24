const { formatters } = use('Validator');

class CreateCategory {
  get rules() {
    return {
      name: 'required|max:30',
      attrs: 'required|array|max:25',
      'attrs.*': 'string|max:60'
    };
  }

  get messages() {
    return {
      'name.required': 'Category name empty.',
      'name.max': 'Category name more then {{argument.0}}.',
      'attrs.required': 'Attributes for category absent.',
      'attrs.array': 'Attributes must be an array.',
      'attrs.max': 'Attribute amount must be less or equals {{argument.0}}.',
      'attrs.*.string': 'Name attribute empty.'
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }
}

module.exports = CreateCategory;
