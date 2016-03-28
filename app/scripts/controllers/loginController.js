'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IoTCPaasMobileApp')
  .controller('LoginController', function($scope, $state, $ionicPopup, localStorageService) {

    ///default login model
    $scope.loginDataModel = {
      username: null,
      password: null,
      isGetToken: '0',
      tokenString: null
    };

    ///check account info
    getDefaultLoginAccount();
    function getDefaultLoginAccount() {

      ///register account
      var registerAccount = localStorageService.get('REGISTER_ACCOUNT');
      if(registerAccount && 4 < registerAccount.length) {
        $scope.loginDataModel.username = registerAccount;
        $scope.loginDataModel.password = null;
        localStorageService.set('REGISTER_ACCOUNT', 'n');

        return;
      };

      ///check default login account
      var defaultLoginAccount = localStorageService.get('DEFAULT_LOGIN_ACCOUNT');
      var defaultLoginPassword = localStorageService.get('DEFAULT_LOGIN_PASSWORD');
      if(defaultLoginAccount && defaultLoginPassword && 4 < defaultLoginAccount.length && 4 < defaultLoginPassword.length) {
        $scope.loginDataModel.username = defaultLoginAccount;
        $scope.loginDataModel.password = defaultLoginPassword;

        return;
      };

      ///save default data to local
      $scope.loginDataModel.username = 'accenture';
      $scope.loginDataModel.password = '123456';
      localStorageService.set('USERNAME:accenture', 'accenture');
      localStorageService.set('PASSWORD:accenture', '123456');
      localStorageService.set('DEFAULT_LOGIN_ACCOUNT', 'accenture');
      localStorageService.set('DEFAULT_LOGIN_PASSWORD', '123456');

    };

    ///login action
    $scope.loginButtonAction = function() {
      ///login data
      var userName = $scope.loginDataModel.username;
      var loginPws = $scope.loginDataModel.password;

      console.log('userName : ' + userName + '\n' + 'password : ' + loginPws);

      ///check user name info
      if (!userName || 4 >= userName.length) {
        $ionicPopup.alert({
          subTitle: 'Account is not available!'
        })

        return;
      }

      if (!(userName.match(/^([a-zA-Z0-9]|[_]|[@]|[.]){5,20}$/))) {
        $ionicPopup.alert({
          subTitle: 'Contains illegal characters account!'
        })

        return;
      };

      var localUserName = localStorageService.get('USERNAME:' + userName);
      if(!localUserName || !(localUserName === userName)) {
        $ionicPopup.alert({
          subTitle: 'The current account is not registered!'
        })

        return;
      };

      ///check user login password info
      var localPassword = localStorageService.get('PASSWORD:' + userName);
      if (!loginPws || 4 >= loginPws.length || !(localPassword === loginPws)) {
        $ionicPopup.alert({
          subTitle: 'Password is not available!'
        });

        return;
      }

      ///change default login account
      localStorageService.set('DEFAULT_LOGIN_ACCOUNT', userName);
      localStorageService.set('DEFAULT_LOGIN_PASSWORD', loginPws);

      ///login success
      $state.go('app.home', {}, {reload: true});
    };

    ///create account button
    $scope.createAccountButtonAction = function() {
      $state.go('registerAccount');
    };

    ///reset password button
    $scope.resetPasswordButtonAction = function() {
      $state.go('resetPassword', {username: $scope.loginDataModel.username});
    };

  });
