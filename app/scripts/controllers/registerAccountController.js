'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IoTCPaasMobileApp')
  .controller('RegisterAccountController', function($scope, $ionicHistory, $ionicPopup, localStorageService) {

    ///regist data model
    $scope.registerDataModel = {
      username: null,
      password: null,
      confirmpassword: null
    };

    ///turn back
    $scope.turnbackButtonAction = function() {
      $ionicHistory.goBack();
    };

    ///register action
    $scope.registerButtonAction = function() {
      ///check data
      var username = $scope.registerDataModel.username;
      if(!username || 4 >= username.length) {
        $ionicPopup.alert({
          subTitle: 'Account is not available!'
        });

        return;
      };

      if (!(username.match(/^([a-zA-Z0-9]|[_]|[@]|[.]){5,20}$/))) {
        $ionicPopup.alert({
          subTitle: 'Contains illegal characters account!'
        });

        return;
      };

      ///check password
      var password = $scope.registerDataModel.password;
      if(!password || 4 >= password.length) {
        $ionicPopup.alert({
          subTitle: 'Password is not available!'
        });

        return;
      };

      if (!(password.match(/^([a-zA-Z0-9]|[_]|[@]|[.]|[!]|[,]|[<]|[>]|[/]|[\]|[[]|[]]|[{]|[}]|[#]|[$]|[%]|[^]|[&]|[*]|[(]|[)]|[-]|[_]|[=]|[+]|[|]|[`]|[~]|[;]|[']|[:]|["]|[?]){5,20}$/))) {
        $ionicPopup.alert({
          subTitle: 'Contains illegal characters password!'
        });

        return;
      };

      ///confirm password check
      var confirmPassword = $scope.registerDataModel.confirmpassword;
      if(!confirmPassword || 4 >= confirmPassword.length) {
        $ionicPopup.alert({
          subTitle: 'Please input password again!'
        });

        return;
      };

      if (!(confirmPassword.match(/^([a-zA-Z0-9]|[_]|[@]|[.]|[!]|[,]|[<]|[>]|[/]|[\]|[[]|[]]|[{]|[}]|[#]|[$]|[%]|[^]|[&]|[*]|[(]|[)]|[-]|[_]|[=]|[+]|[|]|[`]|[~]|[;]|[']|[:]|["]|[?]){5,20}$/))) {
        $ionicPopup.alert({
          subTitle: 'Contains illegal characters confirmPassword!'
        });

        return;
      };

      if(!(confirmPassword === password)) {
        $ionicPopup.alert({
          subTitle: 'The passwords you typed do not match!'
        });

        return;
      };

      ///check account whether have register
      var checkLocalAccount = localStorageService.get('USERNAME:' + username);
      var checkLocalPassword = localStorageService.get('PASSWORD:' + username);
      if(checkLocalAccount && checkLocalPassword && (checkLocalAccount === username)) {
        $ionicPopup.alert({
          subTitle: 'Current account have registered!'
        });

        return;
      };

      ///save account info
      localStorageService.set('USERNAME:' + username, username);
      localStorageService.set('PASSWORD:' + username, password);
      localStorageService.set('REGISTER_ACCOUNT', username);

      ///turnback login page
      $ionicHistory.goBack();

    };

  });
