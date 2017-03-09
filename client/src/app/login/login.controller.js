(function() {
  'use strict';

  angular
    .module('constrr')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($location,authServices) {
    var vm = this;
    vm.submit = submit;
    vm.user = {};

    function submit(e){
      e.preventDefault();
      authServices.login({auth:{email : vm.user.username,
        password :vm.user.password}},function(response){
        if(response.jwt){
          localStorage.setItem('auth_token',response.jwt);
          $location.url('/');
        }
      });  
    }

  }
})();
