'use strict';

/**
 * @ngdoc overview
 * @name IoTCPaasMobileApp
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

/**
 * 待解决问题
 * 1. 登录页面密码输入框是明文
 * 8. 关于描述性文字,未完成
 */

angular.module('IoTCPaasMobileApp', ['ionic', 'ngCordova', 'ngResource', 'pascalprecht.translate', 'LocalStorageModule', 'LanguageConfigModule', 'DYRequestServiceManagerModule', 'CSRequestServiceManagerModule', 'CSAPIServiceManagerModule', 'highcharts-ng'])
  .constant("ENV", {
    "version": "1.0.0",
    "name": "development",
    "debug": true,
    "accessToken": "yyyyyyyyyyyyyyyyyyyyy",
    "api": "https://dcpp-ecosystem-platform.cpaas-accenture.com/"
  })
  .run(function($ionicPlatform, localStorageService, $translate, DYRequestServiceManager, CSRequestServiceManager, CSAPIServiceManager) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

    ///check local setting

  })
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, localStorageServiceProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');
    localStorageServiceProvider.setPrefix('IoTCPaasMobileApp');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
    //$httpProvider.defaults.headers.common["Accept"] = "application/json";

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('guide', {
        url: '/guide',
        abstract: false,
        templateUrl: 'templates/views/guide.html',
        controller: 'GuideController'
      })
      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/views/login.html',
        controller: 'LoginController'
      })
      .state('registerAccount', {
        url: '/registerAccount',
        cache: true,
        templateUrl: 'templates/views/registerAccount.html',
        controller: 'RegisterAccountController'
      })
      .state('resetPassword', {
        url: '/resetPassword',
        cache: true,
        params: {
          username: null
        },
        templateUrl: 'templates/views/resetPassword.html',
        controller: 'ResetPasswordController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/about.html',
            controller: 'AboutController'
          }
        }
      })
      .state('app.temperatureCenter', {
        url: '/temperatureCenter',
        cache: true,
        params: {
          defaultTemperatureData: null
        },
        views: {
          'viewContent': {
            templateUrl: 'templates/views/temperatureCenter.html',
            controller: 'TemperatureCenterController'
          }
        }
      })
      .state('app.videoCenter', {
        url: '/videoCenter',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/videoCenter.html',
            controller: 'VideoCenterController'
          }
        }
      })
      .state('app.photoCenter', {
        url: '/photoCenter',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/photoCenter.html',
            controller: 'PhotoCenterController'
          }
        }
      })
      .state('app.humidityCenter', {
        url: '/humidityCenter',
        cache: true,
        params: {
          defaultHumidityData: null
        },
        views: {
          'viewContent': {
            templateUrl: 'templates/views/humidity.html',
            controller: 'HumidityController'
          }
        }
      });

    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/guide');
  });
