/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', async (faker, i) => ({
  username: `user${i}`,
  email: `user${i}@user.com`,
  password: '12345'
}));

Factory.blueprint('App/Models/Category', async faker => ({
  name: faker.word()
}));

Factory.blueprint('App/Models/Attribute', async (faker, i, data) => ({
  name: faker.word(),
  category_id: data.category_id
}));

Factory.blueprint('App/Models/Product', async (faker, i, data) => ({
  name: faker.word(),
  price: faker.floating({ fixed: 2, min: 1, max: 100000 }),
  category_id: data.category_id,
  user_id: data.user_id
}));

Factory.blueprint('App/Models/ProductAttribute', async (faker, i, data) => ({
  value: faker.word(),
  product_id: data.product_id,
  attribute_id: data.attribute_id
}));
