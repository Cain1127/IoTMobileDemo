'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IoTCPaasMobileApp')
  .controller('ResetPasswordController', function($scope, $ionicHistory, $stateParams, localStorageService) {

    ///reset password data model
    var loginAccount = $stateParams.username;
    $scope.resetPasswordDataModel = {
      username: loginAccount || null,
      newPassword: null,
      confirmNewPassword: null
    };

    ///turn back
    $scope.turnbackButtonAction = function() {
      $ionicHistory.goBack();
    };

    ///reset password button action
    $scope.resetPasswordButtonAction = function() {
      ///check data
      var username = $scope.resetPasswordDataModel.username;
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
      var password = $scope.resetPasswordDataModel.newPassword;
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
      var confirmPassword = $scope.resetPasswordDataModel.confirmNewPassword;
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
      if(!checkLocalAccount || !(checkLocalAccount === username)) {
        $ionicPopup.alert({
          subTitle: 'Current account have not registered!'
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
