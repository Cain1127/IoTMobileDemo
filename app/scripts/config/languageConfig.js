'use strict';

angular.module('LanguageConfigModule', ['pascalprecht.translate'])
  .config(['$translateProvider', function($translateProvider) {
    ///english property
    $translateProvider.translations('en',{
      'LOGIN': {
        'LOGINBUTTONTITLE': 'Sign in',
        'REGISTERACCOUNT': 'Create one now',
        'RESETPASSWORD': 'Forgot password?',
        'USERNAME': 'username',
        'PASSWORD': 'password'
      },
      'REGISTERACCOUNT': {
        'TITLE': 'Register account',
        'USERNAME': 'username',
        'PASSWORD': 'password',
        'CONFIRMPASSWORD': 'confirm password',
        'REGISTERBUTTONTITLE': 'Register now'
      },
      'RESETPASSWORD': {
        'TITLE': 'Reset password',
        'USERNAME': 'username',
        'NEWPASSWORD': 'new password',
        'CONFIRMNEWPASSWORD': 'confirm new password',
        'RESETPASSWORDBUTTONTITLE': 'Reset Password'
      },
      'SETTINGS': {
        TITLE: 'Settings'
      },
      'MENU': {
        'HEADERREFRESHTIPS': 'Pull to refresh...',
        'HOME': 'Home',
        'SETTINGS': 'Settings',
        'ABOUT': 'About Accenture IoT App',
        'LOGOUT': 'Logout'
      },
      'ABOUT': {
        'TITLE': 'About'
      },
      'TEMPERATURECENTER': {
        'TITLE': 'Temperature Monitor',
        'CHARTSTITLE': 'Real-time temperature display',
        'SYSTEMDATE': 'System Date'
      },
      'HOME': {
        'TITLE': 'Home',
        'TEMPERATUREDEVICE': 'Temperature Monitor',
        'VIDEODEVICE': 'Video Monitor',
        'HUMIDITYDEVICE': 'Humidity Monitor',
        'HEADERREFRESHTITLE': 'Pull down to refresh',
        'PHOTO': 'Photo pre/take'
      },
      'VIDEOCENTER': {
        'TITLE': 'Video Monitor',
        'TIPS': 'Please waiting'
      },
      'HUMIDITYCENTER': {
        'TITLE': 'Humidity Monitor',
        'TIPS': 'Please waiting',
        'SYSTEMDATE': 'System Date'
      },
      'PHOTOCENTER':{
        'TITLE': 'Photo Monitor',
        'TIPS':'Plese waiting'
      }
    });

    ///Simplified Chinese property
    $translateProvider.translations('sc',{
      'LOGIN': {
        'LOGINBUTTONTITLE': '登录',
        'REGISTERACCOUNT': '快速注册',
        'RESETPASSWORD': '忘记密码?',
        'USERNAME': '用户名',
        'PASSWORD': '密码'
      },
      'REGISTERACCOUNT': {
        'TITLE': '快速注册',
        'USERNAME': '用户名',
        'PASSWORD': '密码',
        'CONFIRMPASSWORD': '再次确认密码',
        'REGISTERBUTTONTITLE': '注册'
      },
      'RESETPASSWORD': {
        'TITLE': '重置密码',
        'USERNAME': '用户名',
        'NEWPASSWORD': '新密码',
        'CONFIRMNEWPASSWORD': '再次确认新密码',
        'RESETPASSWORDBUTTONTITLE': '重置'
      },
      'SETTINGS': {
        TITLE: '设置'
      },
      'MENU': {
        'HOME': '主页',
        'SETTINGS': '设置',
        'ABOUT': '关于 Accenture IoT App',
        'LOGOUT': '退出'
      },
      'ABOUT': {
        'TITLE': '关于'
      },
      'TEMPERATURECENTER': {
        'TITLE': '温度监测',
        'CHARTSTITLE': '温度实时数据',
        'SYSTEMDATE': '系统日期'
      },
      'HOME': {
        'HEADERREFRESHTIPS': '下拉刷新...',
        'TITLE': '主页',
        'TEMPERATUREDEVICE': '温度监测',
        'VIDEODEVICE': '视频监测',
        'HUMIDITYDEVICE': '湿度监测',
        'HEADERREFRESHTITLE': '下拉刷新',
        'PHOTO': '随心拍'
      },
      'VIDEOCENTER': {
        'TITLE': '视频监测',
        'TIPS': '敬请期待'
      },
      'HUMIDITYCENTER': {
        'TITLE': '湿度监测',
        'TIPS': '敬请期待',
        'SYSTEMDATE': '系统日期'
      },
      'PHOTOCENTER':{
        'TITLE': 'Photo Monitor2',
        'TIPS':'Plese waiting2'
      }
    });

    ///Traditional chinese property
    $translateProvider.translations('tc',{
      'LOGIN': {
        'LOGINBUTTONTITLE': '登入',
        'REGISTERACCOUNT': '快速註冊',
        'RESETPASSWORD': '忘記密碼?',
        'USERNAME': '用戶名',
        'PASSWORD': '密碼'
      },
      'REGISTERACCOUNT': {
        'TITLE': '快速註冊',
        'USERNAME': '用戶名',
        'PASSWORD': '密碼',
        'CONFIRMPASSWORD': '再次確認密碼',
        'REGISTERBUTTONTITLE': '註冊'
      },
      'RESETPASSWORD': {
        'TITLE': '重置密碼',
        'USERNAME': '用戶名',
        'NEWPASSWORD': '新密碼',
        'CONFIRMNEWPASSWORD': '再次確認新密碼',
        'RESETPASSWORDBUTTONTITLE': '重置'
      },
      'SETTINGS': {
        TITLE: '設置'
      },
      'MENU': {
        'HOME': '主頁',
        'SETTINGS': '設置',
        'ABOUT': '關於 Accenture IoT App',
        'LOGOUT': '登出'
      },
      'ABOUT': {
        'TITLE': '關於'
      },
      'TEMPERATURECENTER': {
        'TITLE': '溫度監測',
        'CHARTSTITLE': '溫度實時數據',
        'SYSTEMDATE': '系統日期'
      },
      'HOME': {
        'HEADERREFRESHTIPS': '下拉刷新...',
        'TITLE': '主頁',
        'TEMPERATUREDEVICE': '溫度監測',
        'VIDEODEVICE': '視頻監測',
        'HUMIDITYDEVICE': '濕度監測',
        'HEADERREFRESHTITLE': '下拉刷新',
        'PHOTO': '随心拍'
      },
      'VIDEOCENTER': {
        'TITLE': '視頻監測',
        'TIPS': '敬請期待'
      },
      'HUMIDITYCENTER': {
        'TITLE': '濕度監測',
        'TIPS': '敬請期待',
        'SYSTEMDATE': '系統日期'
      },
      'PHOTOCENTER':{
        'TITLE': 'Photo Monitor3',
        'TIPS':'Plese waiting3'
      }
    });

    ///default language setting
    $translateProvider.preferredLanguage('en');
    //$translateProvider.preferredLanguage(function() {
    //  var settingLanguage = localStorageService.get('settingLanguage');
    //  return settingLanguage ? settingLanguage : 'en'
    //});
  }]);
