'use strict';

/**
 * @ngdoc function
 * @name IoTCPaasMobileApp.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('IoTCPaasMobileApp')
  .controller('SettingsController', function($scope, localStorageService, $translate) {

    // Set static login info for login use
    $scope.settingsItems =
      [
        {
          itemName: 'English',
          itemValue: 'en',
          itemStatus: '1'
        },
        {
          itemName: '简体中心',
          itemValue: 'sc',
          itemStatus: '0'
        },
        {
          itemName: '繁體中文',
          itemValue: 'tc',
          itemStatus: '0'
        }];

    ///default language setting
    $scope.currentLanguage = {
      ///get setting language
      picked: localStorageService.get('languageSetting') ? localStorageService.get('languageSetting') : 'en'
    };

    ///language change action
    $scope.langaugeSettingChange = function(settingItem) {
      ///change current show language
      var pickedLanguage = settingItem.itemValue ? settingItem.itemValue : 'en';
      $translate.use(pickedLanguage);

      ///change local save language setting
      localStorageService.set(pickedLanguage, 'settingLanguage');
    };

  });
