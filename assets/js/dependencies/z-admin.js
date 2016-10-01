
angular.module('admin', ['ui-notification','angular-loading-bar'])
.config(['NotificationProvider', function(NotificationProvider){
  NotificationProvider.setOptions({
    delay: 1200,
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

  this.getSales = function(callback){
    return $http.get('/admin/sales/all').then(callback);
  };
  this.editUser = function(obj, callback){
    return $http.post('/admin/users/update', obj).then(callback);
  };
  this.deleteUser = function(id, callback){
    return $http.post('/admin/users/delete', id).then(callback);
  };
  this.createUser = function(obj, callback){
    return $http.post('/admin/users', obj).then(callback);
  };
  this.getUsers = function(callback){
    return $http.get('/admin/users/all').then(callback);
  };
  this.getProducts = function(callback){
    return $http.get('/admin/products').then(callback);
  };

  this.createProduct = function(obj, callback){
    return $http.post('/admin/products', obj).then(callback);
  };
  this.editProduct = function(obj, callback){
    return $http.post('/admin/products/update', obj).then(callback);
  };
  this.deleteProduct = function(id, callback){
    return $http.post('/admin/products/delete', id).then(callback);
  };
})
.controller('SalesCtrl', ['$scope', '$timeout','AdminServ','$rootScope','Notification',
            function($scope,$timeout,AdminServ,$rootScope,Notification){
              $rootScope.sales = [];
              AdminServ.getSales(function(response){
                $rootScope.sales = response.data; 
                console.log($rootScope.sales)
              });
            }])
.controller('AdminCtrl', ['$scope', '$timeout','AdminServ','$rootScope','Notification',
            function($scope,$timeout,AdminServ,$rootScope,Notification){
              $rootScope.produts = [];
              AdminServ.getProducts(function(response){
                $rootScope.produts = response.data; 
                console.log($rootScope.produts)
              });
              $scope.deleteP = function(id,index){
                AdminServ.deleteProduct({"id":id},function(response){
                  $rootScope.produts.splice(index, 1);
                  Notification.error('Producto Eliminado');
                  console.log(response) 
                }); 
              };
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
              $scope.add = function(index){
                $scope.index = index;
                if(!$rootScope.edit && index==null){
                  $rootScope.obj.image = " http://lorempixel.com/400/200/"; 
                  console.log($rootScope.obj); 
                  AdminServ.createProduct($rootScope.obj,function(response){
                    $('#modal').modal('hide');
                    $rootScope.produts.push(response.data); 
                    Notification.success('Producto Creado!');
                  });
                }else{
                  AdminServ.editProduct($rootScope.obj,function(response){
                    $('#modal').modal('hide');
                    AdminServ.getProducts(function(response2){
                      $rootScope.produts = response2.data; 
                      console.log($rootScope.produts)
                    });
                    Notification.warning('Producto Editado!');
                  });
                }
              };

            }])
            .controller('UserCtrl', ['$scope', '$timeout','AdminServ','$rootScope','Notification',
                        function($scope,$timeout,AdminServ,$rootScope,Notification){
                          $rootScope.users = [];
                          AdminServ.getUsers(function(response){
                            $rootScope.users = response.data; 
                            console.log($rootScope.users)
                          });
                          $scope.deleteP = function(id,index){ AdminServ.deleteUser({"id":id},function(response){
                            $rootScope.users.splice(index, 1);
                            Notification.error('Usuario Eliminado');
                            console.log(response); 
                          }); 
                          };
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
                          $scope.add = function(index){
                            $scope.index = index;
                            if(!$rootScope.edit && index==null){
                              console.log($rootScope.obj); 
                              AdminServ.createUser($rootScope.obj,function(response){
                                $('#modal').modal('hide');
                                $rootScope.users.push(response.data); 
                                Notification.success('Usuario Creado!');
                              });
                            }else{
                              AdminServ.editUser($rootScope.obj,function(response){
                                $('#modal').modal('hide');
                                AdminServ.getUsers(function(response2){
                                  $rootScope.users = response2.data; 
                                  console.log($rootScope.users)
                                });
                                Notification.warning('Usuario Editado!');
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
