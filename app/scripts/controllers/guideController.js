'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IoTCPaasMobileApp')
  .controller('GuideController', function($scope, $state) {
    $scope.slideHasChanged = function(index) {
      console.log('current page : ' + index);
    };

    $scope.tryTemperatureAppButtonAction = function() {
      console.log('guide go to login');
      $state.go('login');
    };
  });
