/* eslint-disable no-plusplus */
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
    const amtRoles = 2;
    const amtUsers = 2;
    const amtCategs = 3;
    const amtAttrs = 3;
    const amtProds = 2;

    const roles = await Factory.model('App/Models/Role').createMany(amtRoles);
    const users = Promise.all(
      roles.map(role => Factory.model('App/Models/User').createMany(amtUsers, { role: role.id }))
    );

    const categories = await Factory.model('App/Models/Category').createMany(amtCategs);

    const attributes = (await Promise.all(
      categories.reduce(
        (prev, category) =>
          prev.concat(Factory.model('App/Models/Attribute').createMany(amtAttrs, { category_id: category.id })),
        []
      )
    )).reduce((prev, attribute) => prev.concat(attribute), []);

    const products = (await Promise.all(
      users.reduce(
        (prev, user) =>
          prev.concat(
            categories.map(category =>
              Factory.model('App/Models/Product').createMany(amtProds, { user_id: user.id, category_id: category.id })
            )
          ),
        []
      )
    )).reduce((prev, product) => prev.concat(product), []);

    await Promise.all(
      products.reduce(
        (prev, product) =>
          prev.concat(
            attributes.filter(attribute => attribute.category_id === product.category_id).map(attribute =>
              Factory.model('App/Models/ProductAttribute').create({
                product_id: product.id,
                attribute_id: attribute.id
              })
            )
          ),
        []
      )
    );
  }
}

module.exports = DatabaseSeeder;
