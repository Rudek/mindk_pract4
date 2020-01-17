const Validator = use('Validator');
const { formatters } = Validator;
const Category = use('App/Models/Category');

const attrsFn = async (data, field, message) => {
  const { category_id: categoryId, attrs } = data;
  if (!attrs) {
    return;
  }
  const category = await Category.findOrFail(categoryId);
  const categoryAttrIds = await category.attrs().ids();

  let fails = categoryAttrIds.length !== attrs.length;
  attrs.forEach(attr => {
    fails = fails || categoryAttrIds.indexOf(parseInt(attr.attribute_id, 10)) === -1;
  });

  if (fails) {
    throw message;
  }
};

Validator.extend('attrs', attrsFn);

class SaveProduct {
  get rules() {
    return {
      category_id: 'required|integer',
      name: 'required|string|max:60',
      price: 'required|number|range:0,100001',
      attrs: 'required|attrs',
      'attrs.*.value': 'required|max:60',
      'attrs.*.attribute_id': 'required|integer'
    };
  }

  get messages() {
    return {
      'name.required': 'Product name empty.',
      'name.max': 'Product name too long.',
      'attrs.attrs': "Product's attributes incorrect or missing.",
      'attrs.*.value.required': 'Attribute value missing.'
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }
}

module.exports = SaveProduct;
