'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IoTCPaasMobileApp')
  .controller('TemperatureCenterController', function($scope, $state, $ionicHistory, $stateParams, $interval, localStorageService, CSAPIServiceManager) {
    $scope.defaultTemperatureData = $stateParams.defaultTemperatureData;
    $scope.systemDate = $scope.defaultTemperatureData[0].x;

    ///turn back
    $scope.turnbackButtonAction = function() {
      $ionicHistory.goBack();
    };

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

    ///custom charts
    $(document).ready(function() {
      var chart = {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in IE < IE 10.
        marginRight: 10,
        events: {
          load: function () {
            ///set up the updating of the chart each second
            var seriesTemperature = this.series[0];
            setInterval(function () {
              ///send random data to server
              //var randomTemperature = Math.random() * 10 + 20;
              //CSAPIServiceManager.senddeviceDiagnostic(randomTemperature)
              //  .then(
              //    function () {
              //      console.log('temperature send success : ' + randomTemperature);
              //    },
              //
              //    function(error) {
              //      console.log('temperature send fail : ' + error);
              //    }
              //  );

              ///get data from server
              CSAPIServiceManager.retrieveDiagnosticEvent()
                .then(
                  function(data) {

                    var devices = JsonData2UI(data.data).eventType[0].devices[0];
                    var detailInfoList = devices.arrayOfDetails;

                    var originalListLength = detailInfoList.length;
                    if(1 < originalListLength) {

                      ///originalListLength - 1
                      var tempDataModel = detailInfoList[0];
                      var dateString = tempDataModel.parameters[0].value;
                      var latestTemperature = parseInt(tempDataModel.parameters[3].value);
                      var timeStamp = Date.parse(new Date(dateString)) / 1000;

                      seriesTemperature.addPoint([timeStamp, latestTemperature], true, true);
                      console.log('temperature value : ' + latestTemperature + '    time stamp : ' + timeStamp);

                    } else {

                      var x = (new Date()).getTime(), y = Math.random();
                      seriesTemperature.addPoint([x, y], true, true);

                    }
                  },

                  function(error) {
                    console.log('temperature error : ' + JSON.stringify(error));
                  });

            }, 5000);
          }
        }
      };
      var title = {
        text: ''
      };
      var xAxis = {
        type: 'datetime',
        tickPixelInterval: 150
      };
      var yAxis = {
        title: {
          text: ''
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: '#808080'
        }]
      };
      var tooltip = {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
      };
      var plotOptions = {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      };

      var legend = {
        enabled: false
      };

      var exporting = {
        enabled: false
      };

      ///create local random demo data
      var series= [{
        name: 'Room Temperature',
        color: '#ff0000',
        width: 2,
        data: (function() {
          var resultData = [],i;
          var defaultLength = $scope.defaultTemperatureData.length;
          for(i = 0; i < defaultLength; i++) {
            var tempDataModel = $scope.defaultTemperatureData[i];
            var timeInfo = tempDataModel.x;
            var temperatureValue = parseInt(tempDataModel.y);
            resultData.push({x: timeInfo, y: temperatureValue});
          }
          return resultData;
        }())
      }];

      var json = {};
      json.chart = chart;
      json.title = title;
      json.tooltip = tooltip;
      json.xAxis = xAxis;
      json.yAxis = yAxis;
      json.legend = legend;
      json.exporting = exporting;
      json.series = series;
      json.plotOptions = plotOptions;

      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      $('#temperatureContainerAngularJS').highcharts(json);
    });
  });
