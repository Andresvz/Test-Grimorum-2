

module.exports.routes = {


  'get /': 'SessionController.index',

  'post /':'SessionController.login',
  
  '/logout':'SessionController.logout',

  //'get /signup': {view: 'signup'},
  
  'get /products':'ProductController',
  
  'get /checkout':'OrderController.checkout',
  
  'post /checkout':'OrderController.sale',
  

  //admin routes 
  'post /admin':'AdminController.index',
  'get /admin/products':'AdminController.getProduct',
  'post /admin/products':'AdminController.createProduct',
  'put /admin/products':'AdminController.editProduct',
  
};
