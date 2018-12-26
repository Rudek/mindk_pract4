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
Route.get('/login', 'AuthController.login');

Route.get('/products/:id', 'ProductController.show');
Route.get('/products?', 'ProductController.showAll');
Route.post('/products', 'ProductController.add');
Route.put('/products/:id', 'ProductController.update');
Route.delete('/products/:id', 'ProductController.delete');

Route.get('/categories/:id', 'CategoryController.show');
Route.get('/categories', 'CategoryController.showAll');
Route.post('/categories', 'CategoryController.add');
Route.put('/categories/:id', 'CategoryController.update');
Route.delete('/categories/:id', 'CategoryController.delete');

Route.get('/attributes/:id', 'AttributeController.show');
Route.get('/attributes', 'AttributeController.showAll');
Route.post('/attributes', 'AttributeController.add');
Route.put('/attributes/:id', 'AttributeController.update');
Route.delete('/attributes/:id', 'AttributeController.delete');
