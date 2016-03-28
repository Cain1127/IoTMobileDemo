'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:MainController
 * @description
 * # MainController
 */
angular.module('IoTCPaasMobileApp')
  .controller('MainController', function($scope, $ionicHistory, $state) {

    ///logout action
    $scope.logoutButtionAction = function() {
      //$ionicHistory.goToHistoryRoot();
      $state.go('app.login');
    };

  });
