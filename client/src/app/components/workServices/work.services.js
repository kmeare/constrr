(function() {
  'use strict';

  angular
    .module('constrr')
    .factory('workServices', workServices);

  /** @ngInject */
  function workServices($log, $http, api, $resource) {
   
   var getWorks = function (params, callback){
       var Service = $resource(api+ '/works',null, {query:{ method: 'GET',isArray:true,headers:{'Authorization':'Bearer '+localStorage.auth_token}}});
       Service.query().$promise.then(function(response){
           _successResponse(response, callback);
       },_errorResponse);
   };

   var getWorkById = function (params, callback){
       var Service = $resource(api+ '/works/'+params,null, {query:{ method: 'GET',headers:{'Authorization':'Bearer '+localStorage.auth_token}}});
       Service.query().$promise.then(function(response){
           _successResponse(response, callback);
       },_errorResponse);
   };


   var saveWork = function(params, callback){
      var Service = $resource(api+'/works',null,{
                post:{ method: 'POST',
                headers:{'Authorization':'Bearer '+localStorage.auth_token}}});
          Service.post(params).$promise.then(function(response) {
          _successResponse(response, callback);
      }, _errorResponse);
    };

    var removeWork = function(params, callback){
      var Service = $resource(api+'/works/'+params,null,{
                remove:{ method: 'DELETE',
                headers:{'Authorization':'Bearer '+localStorage.auth_token}}});
          Service.remove(params).$promise.then(function(response) {
          _successResponse(response, callback);
      }, _errorResponse);
    };

    var _successResponse = function(response, callback){
        return callback( response );
    };
    var _errorResponse = function(response){
        if(!response){
            alert('Expiro Sesión');
        }else{
            alert('Error de Servidor: por favor contacta a lcas_56@hotmail.com');
        }
        
    };

    var service = {
      getWorks: getWorks,
      getWorkById: getWorkById,
      saveWork: saveWork,
      removeWork: removeWork
    };

    return service;


  }
})();
