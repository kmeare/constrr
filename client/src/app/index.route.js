(function() {
  'use strict';

  angular
    .module('constrr')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve:{
          isLogged: function($q,$location,authServices,userInfo,$timeout){
            var deferred = $q.defer();
            $timeout(function(){
              authServices.getCurrentUser({},function(response){
                if(response.error){
                  localStorage.clear();
                  $location.url('/login');
                  deferred.resolve();
                }else{
                  userInfo.setUser(response);
                  deferred.resolve();
                }
              });
            });
            return deferred.promise;
          }
        }
      })
      .when('/work/:id', {
        templateUrl: 'app/work/work.html',
        controller: 'WorkController',
        controllerAs: 'work',
        resolve:{
          isLogged: function($q,$location,authServices,userInfo,$timeout){
            var deferred = $q.defer();
            $timeout(function(){
              authServices.getCurrentUser({},function(response){
                if(response.error){
                  localStorage.clear();
                  $location.url('/login');
                  deferred.resolve();
                }else{
                  userInfo.setUser(response);
                  deferred.resolve();
                }
              });
            });
            return deferred.promise;
          }
        }
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        resolve:{
          isLogged: function($location){
            if(localStorage.auth_token){
              $location.url('/');
            }
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
