

module.exports.routes = {

  // session
  'get /': 'SessionController.index',

  'post /':'SessionController.login',
  
  '/logout':'SessionController.logout',

  //'get /signup': {view: 'signup'},
  // shoping cart 
  'get /products':'ProductController',
  
  'get /checkout':'OrderController.checkout',
  
  'post /checkout':'OrderController.sale',
  

  //admin routes 
  'post /admin':'AdminController.index',
  // products
  'get /admin/products':'AdminController.getProduct',
  'post /admin/products':'AdminController.createProduct',
  'post /admin/products/update':'AdminController.editProduct',
  'post /admin/products/delete':'AdminController.deleteProduct',
   
  //users 
  'get /admin/users':'AdminController.getUsersView',
  'get /admin/users/all':'AdminController.getUsers',
  'post /admin/users':'AdminController.createUser',
  'post /admin/users/delete':'AdminController.deleteUser',
  'post /admin/users/update':'AdminController.updateUser',

  // sales
  'get /admin/sales':'AdminController.getSalesView',
  'get /admin/sales/all':'AdminController.getSales',
};
