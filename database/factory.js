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

Factory.blueprint('App/Models/User', async faker => ({
  username: faker.username(),
  email: faker.email(),
  password: '12345'
}));

Factory.blueprint('App/Models/Category', async faker => ({
  name: faker.word()
}));

Factory.blueprint('App/Models/Attribute', async faker => ({
  name: faker.word()
}));

Factory.blueprint('App/Models/Product', async faker => ({
  name: faker.word(),
  price: faker.floating({ fixed: 2, min: 1, max: 100000 })
}));

Factory.blueprint('App/Models/ProductAttribute', async faker => ({
  value: faker.word()
}));
