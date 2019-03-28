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
const Role = use('App/Models/Role');

class DatabaseSeeder {
  async run() {
    const amtUsers = 2;
    const amtCategs = 3;
    const amtAttrs = 3;
    const amtProds = 2;

    let roles = [];
    roles.push(
      Role.create({
        name: 'User',
        slug: 'user',
        description: 'manage user privileges'
      }));
    roles.push(
      Role.create({
        name: 'Admin',
        slug: 'admin',
        description: 'manage administration privileges'
      }));
    roles = await Promise.all(roles);

    const users = await Factory.model('App/Models/User').createMany(amtUsers);
    await Promise.all(users.map((user, i) => user.roles().attach([roles[i].id])));

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
