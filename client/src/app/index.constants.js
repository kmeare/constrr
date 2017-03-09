/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('constrr')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('api', 'http://localhost:8000');
})();
