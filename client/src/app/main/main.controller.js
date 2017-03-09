(function() {
  'use strict';

  angular
    .module('constrr')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, userInfo, workServices,FileUploader, $mdDialog) {
    var vm = this;
    vm.userData = userInfo.getUser();
    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1488058524106;
    vm.showToastr = showToastr;
    vm.saveNewWork = saveNewWork;
    vm.removeWork = removeWork;
    vm.showConfirm = showConfirm;
    vm.uploader = new FileUploader({url: 'http://localhost:8000/users'});

    workServices.getWorks({},function(response){
      vm.works = response;
    });

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
    
    function saveNewWork(e) {
      e.preventDefault();
      workServices.saveWork({work:vm.work},function(response){
        vm.works.push(response);
      });
    }

    function removeWork(id) {
      workServices.removeWork(id,function(response){
        vm.works = vm.works.filter(function(el){
          return el.id !== id;
        });
      });
    } 

    function showConfirm(e, id) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Quieres Eliminar?')
          .textContent('Una vez que elimines no hay marcha atras.')
          .ariaLabel('Lucky day')
          .targetEvent(e)
          .ok('Eliminar')
          .cancel('Mejor no :D');

    $mdDialog.show(confirm).then(function() {
      removeWork(id);
    }, function() {
      return 0;
    });
  };





  }
})();
