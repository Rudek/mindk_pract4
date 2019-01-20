/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class DatabaseSeeder {
  async run() {
    const amtUsers = 2;
    const amtCategs = 3;
    const amtAttrs = 3;
    const amtProds = 2;

    const users = await Factory.model('App/Models/User').createMany(amtUsers);

    let categories;
    let attributes;
    let products;
    await Factory.model('App/Models/Category')
      .createMany(amtCategs)
      .then(categs => {
        categories = categs;
        const attrsPromises = [];
        let i = 0;
        while (i < amtCategs) {
          attrsPromises.push(Factory.model('App/Models/Attribute').makeMany(amtAttrs));
          i++;
        }
        return Promise.all(attrsPromises);
      })
      .then(attrs => {
        attributes = attrs;
        const attrsPromises = [];
        for (const key in categories) {
          for (const attr of attrs[key]) {
            attr.category_id = categories[key].id;
            attrsPromises.push(attr.save());
          }
        }
        return Promise.all(attrsPromises);
      })
      .then(attrs => {
        const productPromises = [];
        for (let u = 1; u <= amtUsers; u++) {
          for (let c = 1; c <= amtCategs; c++) {
            for (let p = 1; p <= amtProds; p++) {
              productPromises.push(Factory.model('App/Models/Product').make());
            }
          }
        }
        return Promise.all(productPromises);
      })
      .then(prods => {
        // console.log(products);
        products = prods;
        const productPromises = [];
        let keyProd = 0;
        for (const user of users) {
          for (const categ of categories) {
            for (let p = 0; p < amtProds; p++, keyProd++) {
              prods[keyProd].user_id = user.id;
              prods[keyProd].category_id = categ.id;
              productPromises.push(prods[keyProd].save());
            }
          }
        }
        return Promise.all(productPromises);
      })
      .then(() => {
        const productAttributesPromises = [];
        for (let p = 0; p < products.length; p++) {
          for (const key in categories) {
            for (const attribute of attributes[key]) {
              productAttributesPromises.push(Factory.model('App/Models/ProductAttribute').make());
            }
          }
        }
        return Promise.all(productAttributesPromises);
      })
      .then(productAttributes => {
        let pa = 0;
        const productAttributesPromises = [];
        for (const product of products) {
          for (const key in categories) {
            for (const attribute of attributes[key]) {
              if (attribute.category_id === product.category_id) {
                productAttributes[pa].product_id = product.id;
                productAttributes[pa].attribute_id = attribute.id;
                productAttributesPromises.push(productAttributes[pa].save());
                pa++;
              }
            }
          }
        }
        return Promise.all(productAttributesPromises);
      });
  }
}

module.exports = DatabaseSeeder;
