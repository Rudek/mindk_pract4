const Validator = use('Validator');
const { formatters } = Validator;

class FilterProducts {
  get rules() {
    return {
      categ: 'integer',
      name: 'string|max:60',
      sort: 'in:desc,asc',
      order: 'in:price,created_at',
      user: 'integer'
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }
}

module.exports = FilterProducts;
