'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:MainController
 * @description
 * # MainController
 */
angular.module('IoTCPaasMobileApp')
  .controller('VideoCenterController', function($scope, $ionicHistory) {

    ///turn back
    $scope.turnbackButtonAction = function() {
      $ionicHistory.goBack();
    };

  });
