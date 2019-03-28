/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));
Route.group(() => {
  Route.get('/user/login', 'UserController.login');

  Route.get('/products', 'ProductController.showAll').validator('FilterProducts');
  Route.get('/products/:id', 'ProductController.show');
  Route.post('/products', 'ProductController.add').validator('SaveProduct');
  Route.put('/products/:id', 'ProductController.update').validator('SaveProduct');
  Route.delete('/products/:id', 'ProductController.delete');

  Route.get('/categories', 'CategoryController.showAll');
  Route.get('/categories/:id', 'CategoryController.show');
  Route.post('/categories', 'CategoryController.add').validator('CreateCategory');
  Route.put('/categories/:id', 'CategoryController.update').validator('UpdateCategory');
  Route.delete('/categories/:id', 'CategoryController.delete');

  Route.get('/attributes', 'AttributeController.showAll');
  Route.get('/attributes/:id', 'AttributeController.show');
  Route.post('/attributes', 'AttributeController.add').validator('SaveAttribute');
  Route.put('/attributes/:id', 'AttributeController.update').validator('SaveAttribute');
  Route.delete('/attributes/:id', 'AttributeController.delete');
}).prefix('api/v1');
