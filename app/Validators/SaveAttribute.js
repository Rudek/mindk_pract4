const Validator = use('Validator');
const { formatters } = use('Validator');
const Category = use('App/Models/Category');

const categFn = async data => {
  if (typeof data.category_id !== 'undefined') {
    await Category.findOrFail(data.category_id);
  }
};

Validator.extend('categ', categFn);

class SaveAttribute {
  get rules() {
    return {
      name: 'required|string|max:60',
      category_id: 'required|integer|categ'
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }
}

module.exports = SaveAttribute;
