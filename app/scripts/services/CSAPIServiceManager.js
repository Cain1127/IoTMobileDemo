'use strict';

/**
 * @ngdoc function
 * @name Test.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('CSAPIServiceManagerModule', [])
  ///use factory for services
  .factory('CSAPIServiceManager', function($http, $timeout, $q, CSRequestServiceManager) {
    function retrieveDiagnosticEvent() {
      return CSRequestServiceManager.postConnect(
        '',
        '/t/dcpp107.acn/platform/enabler/samplingDataAccess/eventDetails/retrieveByDeviceId/1.0.0',
        {
          //"deviceId": "AliDevice-1-1",
          "deviceId": "Device_aaron10",
          "deviceType": "AliGateway",
          "eventType": [
            "device_diagnostic"
          ],
          'pageNumber': 1,
          'maxElementsPerPage': 10,
          "transactionId": "tx-123889111"
        },
        {
          'common': {
            'tenant': 107,
            'enterprise': 1
          },
          'post': {
            'Content-Type': 'application/json'
          }
        }
      )
    };

    ///rend random temperature data to server
    var senddeviceDiagnostic = function(randomTemperature) {
      var timeStamp = (new Date()).getTime();
      var timeInfo = moment().format().replace(/([\+|\-])(\d{2})\:(\d{2})/, '.000$1$2$3');
      //var now = ((new Date()).getTime()).toString();
      var defaultData = {
        "cpuUsage": "100.3",
        "temperature": randomTemperature ? randomTemperature : "20",
        "memoryUsage": "102.14",
        "ramTot": "103",
        "memoryTot": "104",
        "ipAddress": "127.0.0.1",
        "swVersion": "sw_version_1234",
        "date": timeInfo,
        "signalStrength": "snlStrength",
        "message": "message value",
        "sampleId": "sample_id_123",
        "privateIP": "127.0.0.1",
        "networkType": " Wifi",
        "upTime": "1000"
      };

      var defaultHeader = {
        'common': {
          'parentBusinessUserId': 1,
          'device-type': 'AliGateway',
          'device-id': 'AliDevice-1-1',
          'tenantId': 107,
          'transaction-id': 'TDC-x00001'

        },
        'post': {
          'Content-Type': 'application/json'
        }
      }

      return CSRequestServiceManager.postConnect(
        '',
        '/t/dcpp107.acn/platform/enabler/dcm/deviceDiagnostic/send/1.0.0',
        defaultData,
        defaultHeader
      )
    };

    ///get json API
    function  eastNewsAPI() {
      return CSRequestServiceManager.getConnect(
        '',
        'http://c.m.163.com/nc/article/headline/T1348647909107/0-20.html',
        '',
        '',
        '',
        ''
      );
    };

    // public api
    return {
      getTokens: CSRequestServiceManager.getTokens,
      retrieveDiagnosticEvent: retrieveDiagnosticEvent,
      senddeviceDiagnostic: senddeviceDiagnostic,
      eastNewsAPI: eastNewsAPI
    };
  })
