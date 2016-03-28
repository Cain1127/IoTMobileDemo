'use strict';

/**
 * @ngdoc service
 * @name IoTCPaasMobileApp.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('CSRequestServiceManagerModule', [])
  .factory('CSRequestServiceManager', function($window, $http, $q, $log, API_ENDPOINT, CSAPIBaseData) {

    var _api = API_ENDPOINT;
    var endpoint = _api.port ? (_api.host + ':' + _api.port + _api.path) : (_api.host + _api.path);


    var postConnect = function(before, path, data, headers, conf, method) {

      var deferred = $q.defer();
      if (before.action === 'getTokens') {
        return post();
      }
      // activate for basic auth
      if (objIsEmpty(CSAPIBaseData.tokens)) {
        postConnectWithInactiveToken().then(function(data) {
          deferred.resolve(data);
        }, function(error) {
          deferred.reject(error);
        });
      } else {
        post().then(function(data) {
          //alert('api success' + JSON.stringify(data))
          deferred.resolve(data);
        }, function(error) {
          //alert('api error' + JSON.stringify(error));
          var res = JSON.parse(JSON.stringify(error.data));
          // Access Token Inactive
          if (res.fault && (res.fault.code === 900904 || res.fault.code === 900903)) {
            postConnectWithInactiveToken().then(function(data) {
              deferred.resolve(data);
            }, function(error) {
              deferred.reject(error);
            });
          } else {
            deferred.reject(error);
          }
        });
      };

      function postConnectWithInactiveToken() {
        var deferred = $q.defer();
        getTokens().then(
          function(data) {
            //deferred.resolve(data);
          },
          function(error) {
            //deferred.reject(error);
          },
          function(data) {
            //alert('Inactive tokens complate:' + JSON.stringify(data))
            post().then(function(data) {
              //alert('Inactive api success:' + JSON.stringify(data))
              deferred.notify(data);
              deferred.resolve(data);
            }, function(error) {
              //alert('Inactive api error:' + JSON.stringify(error))
              deferred.notify(error);
              deferred.reject(error);
            });

          });
        return deferred.promise;
      }

      function post() {

        resetHeader(headers);
        $http.defaults.headers.common.Authorization = getBearer();
        if (before.fn) {
          before.fn();
        } else {
          before && before();
        }

        var opt = {
          url: endpoint + path,
          data: data,
          method: method ? method : 'POST'
        };

        if (!objIsEmpty(conf)) {
          for (var i in conf) {
            opt[i] = conf[i];
          }
        }

        return $http(opt);
      }

      return deferred.promise;
    };

    var getConnect = function(before, path, data, headers, conf, method) {

      var deferred = $q.defer();
      // activate for basic auth
      if (objIsEmpty(CSAPIBaseData.tokens)) {
        getConnectWithInactiveToken().then(function(data) {
          deferred.resolve(data);
        }, function(error) {
          deferred.reject(error);
        });
      } else {
        get().then(function(data) {
          console.log('get api success : ' + JSON.stringify(data));
          deferred.resolve(data);
        }, function(error) {
          //alert('api error' + JSON.stringify(error));
          var res = JSON.parse(JSON.stringify(error.data));
          // Access Token Inactive
          if (res.fault && (res.fault.code === 900904 || res.fault.code === 900903)) {
            getConnectWithInactiveToken().then(function(data) {
              deferred.resolve(data);
            }, function(error) {
              deferred.reject(error);
            });
          } else {
            deferred.reject(error);
          }
        });
      };

      function getConnectWithInactiveToken() {
        var deferred = $q.defer();
        getTokens().then(
          function(data) {
            //deferred.resolve(data);
          },
          function(error) {
            //deferred.reject(error);
          },
          function(data) {
            //alert('Inactive tokens complate:' + JSON.stringify(data))
            get().then(function(data) {
              alert('Inactive api success:' + JSON.stringify(data));
              deferred.notify(data);
              deferred.resolve(data);
            }, function(error) {
              //alert('Inactive api error:' + JSON.stringify(error));
              deferred.notify(error);
              deferred.reject(error);
            });
          });

        return deferred.promise;
      };

      function get() {

        resetHeader(headers);
        $http.defaults.headers.common.Authorization = getBearer();
        before && before();
        var opt = {
          url: ((0 == path.indexOf('http')) ? path : endpoint + path),
          data: data,
          method: method ? method : 'GET'
        };

        if (!objIsEmpty(conf)) {
          for (var i in conf) {
            opt[i] = conf[i];
          }
        }

        return $http(opt);
      }

      return deferred.promise;
    };

    var param = function(obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    function resetHeader(headers) {

      $http.defaults.headers.common = {};
      $http.defaults.headers.post = {};

      function setHeader(obj, headers) {
        if (angular.isObject(headers)) {
          for (var i in headers) {
            obj[i] = headers[i];
          }
        }
      }

      setHeader($http.defaults.headers, headers);
    }

    function getBearer() {
      if (!objIsEmpty(CSAPIBaseData.tokens) && CSAPIBaseData.tokens.token_type) {
        return FirstUperCase(CSAPIBaseData.tokens.token_type) + ' ' + CSAPIBaseData.tokens.access_token;
      } else {
        return '';
      }
    }

    function objIsEmpty(obj) {
      for (var i in obj) {
        return false;
      }
      return true;
    }

    function FirstUperCase(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    }

    function getTokens() {
      var deferred = $q.defer();
      postConnect({
          action: 'getTokens',
          fn: function() {
            delete $http.defaults.headers.common['X-Requested-With'];
            delete $http.defaults.headers.common.Authorization;
          }
        },
        '/oauth2/token',
        {
          'client_id': 'fM6s3LvPZh9f9ExLButJaTj5ia0a',
          'client_secret': '2BCV3FCEiqYhlGkUqUowCQK25zEa',
          'grant_type': 'client_credentials'
        },
        {
          'post': {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        },
        {
          transformRequest: function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
          },
          transformResponse: function(data) {
            return data;
          }
        }
      ).then(function(data) {
        //alert('token success: ' + JSON.stringify(data.data));
        CSAPIBaseData.tokens = JSON.parse(data.data);
        deferred.notify(data);
        deferred.resolve(data);
      }, function(error) {
        //alert('token error: ' + JSON.stringify(error));
        CSAPIBaseData.tokens = JSON.parse(JSON.stringify(error));
        deferred.notify(error);
        deferred.reject(error);
      });

      return deferred.promise;
    }

    // public apiEndpoint
    return {
      getEndpoint: function() {
        return endpoint;
      },
      postConnect: postConnect,
      getConnect: getConnect,
      getTokens: getTokens
    };
  });
