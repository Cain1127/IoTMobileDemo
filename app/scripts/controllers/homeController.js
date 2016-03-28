'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IoTCPaasMobileApp')
  .controller('HomeController', function($scope, $timeout, $state, CSAPIServiceManager, $interval, DYRequestServiceManager) {
    ///json data change
    function JsonData2UI(data) {

      if (angular.isObject(data)) {
        data = JSON.parse(JSON.stringify(data));
      }
      if (angular.isString(data)) {
        data = JSON.parse(data);
      }
      return data;
    }

    ///default data
    requestDefaultTemperatureData();
    $scope.defaultTemperatureData = [];
    $scope.defaultHumidityData = [];
    function requestDefaultTemperatureData() {

      DYRequestServiceManager.getToken();
      //DYRequestServiceManager.getEastTodayNews();
      //CSAPIServiceManager.eastNewsAPI();

      $interval(function() {
        CSAPIServiceManager.retrieveDiagnosticEvent()
          .then(
            function(data) {

              var devices = JsonData2UI(data.data).eventType[0].devices[0];
              var detailInfoList = devices.arrayOfDetails;

              var originalListLength = detailInfoList.length;
              if(1 < originalListLength) {

                ///clear original array
                $scope.defaultTemperatureData = [];
                $scope.defaultHumidityData = [];

                for(var i = originalListLength; i > 0; i --) {
                  var tempDataModel = detailInfoList[i - 1];
                  var dateString = tempDataModel.parameters[0].value;
                  var latestTemperature = parseInt(tempDataModel.parameters[3].value);
                  var timeStamp = Date.parse(new Date(dateString)) / 1000;

                  $scope.defaultTemperatureData.push({x: timeStamp, y: latestTemperature});

                  var latestHumidity = parseInt(tempDataModel.parameters[2].value);
                  $scope.defaultHumidityData.push({x: timeStamp, y: latestHumidity});
                }

                console.log('finish request default data : ' + JSON.stringify($scope.defaultHumidityData));

              } else {

                var time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                  $scope.defaultTemperatureData.push({
                    x: time + i * 1000,
                    y: Math.random() * 10 + 20
                  });

                  $scope.defaultHumidityData.push({
                    x: time + i * 1000,
                    y: Math.random() * 30 + 30
                  });
                }
              }
            },

            function(error) {
              console.log('temperature error : ' + JSON.stringify(error));

              var time = (new Date()).getTime(),i;
              for (i = -19; i <= 0; i += 1) {
                $scope.defaultTemperatureData.push({
                  x: time + i * 1000,
                  y: Math.random() * 100
                });
              }
            }
          )
      }, 10000);
    };

    ///Header refresh
    $scope.fetchDeviceListFromServer = function() {
      $timeout(function() {
        $scope.devicesInfoList[1].deviceValue = $scope.devicesInfoList[1].deviceValue + 1;
      }, 1000)
        .then(function() {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    ///share action
    $scope.deviceInfoShareButtonAction = function() {
      console.log('share button action');
    };

    ///go to temperature monitor page
    $scope.temperatureDeviceDetailButtonAction = function() {
      $state.go('app.temperatureCenter', {defaultTemperatureData: $scope.defaultTemperatureData});
    };

    ///go to humidity monitor page
    $scope.humidityDeviceDetailButtonAction = function() {
      $state.go('app.humidityCenter', {defaultHumidityData: $scope.defaultHumidityData});
    };

    ///Banner random triggle
    $scope.defaultBannerPicture = './images/home_banner_01.jpg';
    var bannerRandomTriggler = function() {
      var num = parseInt(Math.random() * 4 + 1);
      $scope.defaultBannerPicture = './images/home_banner_0' + num + '.jpg';
    };
    bannerRandomTriggler();
  });
