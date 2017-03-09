(function() {
  'use strict';

  angular
      .module('constrr')
      .service('userInfo', userInfo);

  /** @ngInject */
  function userInfo() {
    
    var user;
    
    return {
        getUser: getUser,
        setUser: setUser
    }

    function getUser() {
      return user;
    }
    function setUser(val) {
        user = val;
    }
  }

})();
