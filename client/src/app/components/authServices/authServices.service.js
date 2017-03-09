(function() {
  'use strict';

  angular
    .module('constrr')
    .factory('authServices', authServices);

  /** @ngInject */
  function authServices($log, $http, api, $resource) {
   
   var login = function( params, callback ) {
        var Service = $resource(api+'/user_token/');
        Service.save(params).$promise.then(function(response) {
            _successResponse(response, callback);
        }, _errorResponse);
   }; 

   var getCurrentUser = function (params, callback){
       var Service = $resource(api+ '/user/me',null, {get:{ method: 'GET',headers:{'Authorization':'Bearer '+localStorage.auth_token}}});
       Service.get().$promise.then(function(response){
           _successResponse(response, callback);
       },_errorResponse);
   };

   var removeUser = function (params, callback){
        var Service = $resource(api+'/users/'+params,null,{
            remove:{ method: 'DELETE',
            headers:{'Authorization':'Bearer '+localStorage.auth_token}}
        });
        Service.remove(params).$promise.then(function(response) {
            _successResponse(response, callback);
        }, _errorResponse);
   };

    var _successResponse = function(response, callback){
        return callback( response );
    };
    var _errorResponse = function(response){
        if(response.status == 400){
          return alert('Ingresa tu Usuario y contraseña');
        }
        alert('Credenciales Invalidas');
            
        
    };

    var service = {
      login:login,
      getCurrentUser:getCurrentUser,
      removeUser: removeUser
    };

    return service;


  }
})();
