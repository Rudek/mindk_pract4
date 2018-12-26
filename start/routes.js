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
Route.get('/product/show/:id', 'ProductController.show');
Route.get('/product', 'ProductController.showAll');
Route.get('/product/filter', 'ProductController.filter');
Route.post('/product/add', 'ProductController.add');
Route.patch('/product/update/:id', 'ProductController.update');
Route.delete('/product/delete/:id', 'ProductController.delete');
