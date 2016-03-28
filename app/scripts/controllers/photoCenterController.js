'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:MainController
 * @description
 * # MainController
 */
angular.module('IoTCPaasMobileApp')
  .controller('PhotoCenterController', function($scope, $timeout, $ionicHistory,localStorageService, $ionicLoading) {

    ///turn back
    $scope.turnbackButtonAction = function() {
      $ionicHistory.goBack();
    };

    var txn_id;
    var txn_requestor="jinxin.wu";
    var wsbroker = "54.223.63.168";  //mqtt websocket enabled broker
    var wsport = 7685 // port for above
    var client = new Paho.MQTT.Client(wsbroker, wsport,
            "mqttdemoclientid_" + parseInt(Math.random() * 10000, 10));
    client.onConnectionLost = function (responseObject) {
        console.log("connection lost: " + responseObject.errorMessage);
    };
    client.onMessageArrived = function (message) {
        console.log(message.destinationName, ' received MQTT message: ', message.payloadString);
        var response=JSON.parse(message.payloadString);
        //alert(response.origin_transaction_id);
        //alert(response.response_data.image_url);
        if(txn_id == response.origin_transaction_id && response.status_code=='01') {
            iotImg.src = response.response_data.image_url;
        }
    };

    var options = {
        timeout: 3,
        userName: "admin",
        password: "password",
        onSuccess: function () {
            console.log("mqtt connected");
            // Connection succeeded; subscribe to our topic, you can add multile lines of these
            client.subscribe('mqtt_smarthome_response', {qos: 1});

        },
        onFailure: function (message) {
            console.log("Connection failed: " + message.errorMessage);
        }
    };

    $scope.init = function(){
       client.connect(options);
    };

    $scope.takePicture = function(){
        //use the below if you want to publish to a topic on connect
        txn_id = 'TKP-'+parseInt(Math.random() * 100000, 10);
        var message = new Paho.MQTT.Message(constructReqMessage("IoT_CDC_CAMERA_0001",txn_id,txn_requestor));
        message.destinationName = "mqtt_smarthome_request";
        client.send(message);
        console.log("transaction "+ txn_id+" is created!");
    }

    //IoT_CDC_CAMERA_0001
    //2016-03-23T15:56:56.442+0801
    var constructReqMessage=function(aDeviceId, aTxnId, aRequestor){
      var aTimeNow=(new Date()).toISOString();
      var aCmd="TAKE_PICTURE";
      var msg='{"device_id": "'+aDeviceId+'","transaction_id": "'+aTxnId+'","transaction_command": "'+aCmd+'","request_time": "'+aTimeNow+'","requestor": "'+aRequestor+'"}';
      return msg;
    }

    $scope.takephoto = function(){
      showHUD();
      //takepho();

      $timeout(function(){
        hideHUD();
      },6000);
    }



    //loding动画效果显示与隐藏
      var showHUD = function () {
        $ionicLoading.show({
          template: '<div style="height:50px; width:52px; position:relative;"><ion-spinner icon="ios" style=" width: 19%"></ion-spinner><i style="position:absolute;right:0px; top:35px;">Loading</i></div>',
           //duration:1000
        });
      };
      var hideHUD = function () {
        $ionicLoading.hide();
      };

  })
;
