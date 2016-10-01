
angular.module('admin', ['ui-notification','angular-loading-bar'])
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
.service('AdminServ', function($http){
  
  this.getProducts = function(callback){
    return $http.get('/admin/products').then(callback);
  };

  this.createProduct = function(obj, callback){
    return $http.post('/admin/products', obj).then(callback);
  };
  this.editProduct = function(obj, callback){
    return $http.put('/admin/products', obj).then(callback);
  };
})
.controller('AdminCtrl', ['$scope', '$timeout','AdminServ','$rootScope','Notification',
function($scope,$timeout,AdminServ,$rootScope,Notification){

   AdminServ.getProducts(function(response){
      $scope.produts = response.data; 
      console.log($scope.produts)
    });

  $scope.showM = function(ele){
    console.log(ele)
    $rootScope.edit = false;
    if(ele){
      $rootScope.obj = angular.copy(ele);
      $rootScope.edit = true;
    }else{
      $rootScope.edit = false;
      $rootScope.obj = {};
    }
    $('#modal').modal('show');
   }
  $scope.sendEdit = function(){
  };
  $scope.add = function(){
    if($rootScope.edit){
      $rootScope.obj.image = " http://lorempixel.com/400/200/"; 
      console.log($rootScope.obj); 
      //var data = new FormData();
      //angular.forEach($rootScope.obj, (item, i) => {
      //data.append(`${item}[${i}]`, item);
      //});
      AdminServ.createProduct($rootScope.obj,function(response){
        console.log(response)
        $scope.produts.push(response.data); 
        Notification.success('Producto Creado!');
        $('#modal').modal('hide');
      });

    }else{
      AdminServ.editProduct($rootScope.obj,function(response){
        console.log(response)
        $scope.produts.push(response.data); 
        Notification.success('Producto Editado!');
        $('#modal').modal('hide');
      });
    }
  };
            
}])
.directive('t3bsBrowser', function($timeout) {
  return {
    restrict: 'E', 
    scope: {
      fileModel: '=',
    },
    template:  function( tElt, tAttrs ) {
      var ot='';
      if(tAttrs.required != undefined){ ot += 'required="" ' }
      return '<button class="btn bg-purple btn-flat" type="button" > \
      <i class="fa fa-folder-open-o"></i> Seleccionar  \
      </button>' +                                              
        '<input type="file" style="display:none" ng-model="fileModel" '+ot+
          'accept="accept"/>'+      
            '<span ng-if="!fileModel.name"> No se ha seleccionado</span>  \
            <span ng-if="fileModel.name">  \
            <strong>{{ fileModel.name }}</strong>  \
            <a ng-click="cleanInput()" class="btn" href="javascript:void(0)">x</a>  \
            </span>';
    },
    link : function(scope, elem, attr) {
      scope.accept = attr.fileAccept || '*';
      var $input = elem[0].querySelector('input');
      var $button = elem[0].querySelector('button');

      scope.cleanInput = function(){
        scope.fileModel = null;
      }

      $button.addEventListener('click', function(){
        $input.click();
      });
      $input.addEventListener("change", function(event){
        var $file = $input.files[0];
        if($file){
          scope.fileModel = $file;
          scope.$apply();
        }
      });
    }
  };
});
