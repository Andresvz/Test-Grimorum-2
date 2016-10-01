angular.module('app', ['ui-notification','angular-loading-bar'])
.config(['NotificationProvider', function(NotificationProvider){
    NotificationProvider.setOptions({
      delay: 800,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'left',
      positionY: 'top'
    });
}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeBar = true;
}])
.service('ProductServ', function($http){
  this.checkoutSend = function(data, callback){
    return $http.post('/checkout/', data)
    .then(callback, this.handleError) 
  }
})
.controller('ProductCtrl', ['$scope', '$timeout','ProductServ','$rootScope','Notification',function($scope,$timeout,ProductServ,
$rootScope,Notification){
 
  var cart = [];

  $scope.products_to = window.products_all;
  console.log($scope.products_all) 

  $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
  
  if(localStorage.getItem('order')){
    $rootScope.count = JSON.parse(localStorage.getItem('order')).length;
  }else{
    $rootScope.count = 0;
  }


  $scope.addToCar = function(product){
    var date = {};
    
    if(!localStorage.getItem('order')){
      $rootScope.shopingCart = {};
      data = {"item":product,"cantidad":1}
      cart.push(data)
      $rootScope.count = cart.length;
      console.log('nuevo')      
      console.log(cart)      
      localStorage.setItem('order', JSON.stringify(cart))
      $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
      Notification.success('Producto agregado al carrito');
    }else{
      cart = [];
      cart = JSON.parse(localStorage.getItem('order'))
      var Olditem = _.find(cart, function(item){ return item.item.id == product.id });
      console.log(Olditem)
      if(Olditem){
        Olditem.cantidad++;
        angular.forEach(cart, function(value, key) {
          if(value.item.id == Olditem.item.id){
            value = Olditem;
          } 
        });
        console.log(cart)      
        $rootScope.count = cart.length;
        localStorage.setItem('order', JSON.stringify(cart))
        $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
        Notification.success('Producto agregado al carrito');
      }else{
        data = {"item":product,"cantidad":1}
        cart.push(data)
        console.log(cart)      
        $rootScope.count = cart.length;
        localStorage.setItem('order', JSON.stringify(cart))
        $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
        Notification.success('Producto agregado al carrito');
      }      
    }
  };

  $scope.max = function(order){
    var cart = [];
    cart = JSON.parse(localStorage.getItem('order'))
    var Olditem = _.find(cart, function(item){ return item.item.id == order.item.id });
    if(Olditem){
      Olditem.cantidad++;
      angular.forEach(cart, function(value, key) {
        if(value.item.id == Olditem.item.id){
          value = Olditem;
        } 
      });
      console.log(cart)      
      $rootScope.count = cart.length;
      localStorage.setItem('order', JSON.stringify(cart))
      $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
      Notification.success('+ Unidad agregada ');
    }
  };

  $scope.minux = function(order){
    var cart = [];
    cart = JSON.parse(localStorage.getItem('order'))
    var Olditem = _.find(cart, function(item){ return item.item.id == order.item.id });
    if(Olditem){
      Olditem.cantidad--;
      angular.forEach(cart, function(value, key) {
        if(value.item.id == Olditem.item.id){
          value = Olditem;
        } 
      });
      console.log(cart)      
      $rootScope.count = cart.length;
      localStorage.setItem('order', JSON.stringify(cart))
      $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
      Notification.warning(' - Unidad retirada! ');
    }
  };

  $scope.delete = function(order){


    var cart = [];
    cart = JSON.parse(localStorage.getItem('order'))
    var Olditem = _.find(cart, function(item){ return item.item.id == order.item.id });
    if(Olditem){
      angular.forEach(cart, function(value, key) {
        if(value.item.id == Olditem.item.id){
          cart.splice(key,1);
        } 
      });
      console.log(cart)      
      $rootScope.count = cart.length;
      localStorage.setItem('order', JSON.stringify(cart))
      $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
      Notification.error('Producto eliminado del carrito');
    }
  } 
  $scope.goDetail = function(product){
    $('#detail').modal('show');
    $rootScope.detail_product = product; 
    $rootScope.quantity = 1;
  };
  
  $scope.addTOItemDetail = function(item,cant){
    var data = {};
    var cart = [];
  
    if(!localStorage.getItem('order')){
    data = {"item":item,"cantidad":cant}
      cart.push(data)
      $rootScope.count = cart.length;
      console.log(cart)      
      localStorage.setItem('order', JSON.stringify(cart))
      $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
      Notification.success('Producto agregado al carrito');
      $rootScope.quantity = 1;
    }else{
      cart = [];
      cart = JSON.parse(localStorage.getItem('order'))
      var Olditem = _.find(cart, function(items){ return items.item.id == item.id });
      if(Olditem){
        Olditem.cantidad = Olditem.cantidad+cant;
        angular.forEach(cart, function(value, key) {
          if(value.item.id == Olditem.item.id){
            value = Olditem;
          } 
        });
        console.log(cart)      
        $rootScope.count = cart.length;
        localStorage.setItem('order', JSON.stringify(cart))
        $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
        Notification.success('Producto agregado al carrito');
        $rootScope.quantity = 1;
      }else{
        data = {"item":item,"cantidad":cant}
        cart.push(data)
        console.log(cart)      
        $rootScope.count = cart.length;
        localStorage.setItem('order', JSON.stringify(cart))
        $rootScope.shopingCart = JSON.parse(localStorage.getItem('order'));
        Notification.success('Producto agregado al carrito');
        $rootScope.quantity = 1;
      }      
    }
    $('#detail').modal('hide');
  }
  $scope.Total = function(){
    var total = 0; 
    angular.forEach(JSON.parse(localStorage.getItem('order')), function(item){
      total += parseInt(item.cantidad) * item.item.price;
    });
    return total;
  };

  $scope.comprar =function(){
    var tmp = JSON.parse(localStorage.getItem('order'));
    var data ={};
    var aux =[]; 
    angular.forEach(tmp, function(item){
      item.item.quantity = item.cantidad;
      data = item.item;
      aux.push(data);
    });
    console.log(aux)
    ProductServ.checkoutSend(aux, function(data){
      console.log(data)    
      if (data.status == 200) {
        localStorage.clear();
        Notification.info('Compra exitosa!');
        $timeout(function(){
          window.location.href='/products';
        }, 800);
      } else {
        console.error(data); 
        Notification.error('Intenta nuevamente!');
      }
    }); 
  }
}]);


