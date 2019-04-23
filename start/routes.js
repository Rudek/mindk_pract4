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
  Route.get('/user/logout', 'UserController.logout');

  Route.get('/products', 'ProductController.showAll').validator('FilterProducts');
  Route.get('/products/:id', 'ProductController.show');
  Route.post('/products', 'ProductController.add')
    .validator('SaveProduct')
    .middleware(['auth', 'is:user']);
  Route.put('/products/:id', 'ProductController.update')
    .validator('SaveProduct')
    .middleware(['auth', 'is:user', 'isOwner']);
  Route.delete('/products/:id', 'ProductController.delete').middleware(['auth', 'is:user', 'isOwner']);

  Route.get('/categories', 'CategoryController.showAll');
  Route.get('/categories/:id', 'CategoryController.show');
  Route.post('/categories', 'CategoryController.add')
    .validator('CreateCategory')
    .middleware(['auth', 'is:admin']);
  Route.put('/categories/:id', 'CategoryController.update')
    .validator('UpdateCategory')
    .middleware(['auth', 'is:admin']);
  Route.delete('/categories/:id', 'CategoryController.delete').middleware(['auth', 'is:admin']);

  Route.get('/attributes', 'AttributeController.showAll');
  Route.get('/attributes/:id', 'AttributeController.show');
  Route.post('/attributes', 'AttributeController.add')
    .validator('SaveAttribute')
    .middleware(['auth', 'is:admin']);
  Route.put('/attributes/:id', 'AttributeController.update')
    .validator('SaveAttribute')
    .middleware(['auth', 'is:admin']);
  Route.delete('/attributes/:id', 'AttributeController.delete').middleware(['auth', 'is:admin']);
}).prefix('api/v1');
