(function() {
  'use strict';

  angular
    .module('constrr')
    .controller('WorkController', WorkController);

  /** @ngInject */
  function WorkController($timeout, userInfo, workServices,FileUploader, $mdDialog, $routeParams) {
    var vm = this;
    vm.userData = userInfo.getUser();
    
    workServices.getWorkById($routeParams.id,function(response){
        vm.work = response;
    });





  }
})();
