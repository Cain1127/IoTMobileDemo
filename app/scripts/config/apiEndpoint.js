'use strict';

/**
 * @ngdoc constant
 * @name IoTCPaasMobileApp.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('IoTCPaasMobileApp')
  // development
  .constant('API_ENDPOINT', {
    host: 'https://dcpp-ecosystem-platform.cpaas-accenture.com',
    port: '',
    path: '',
    needsAuth: false
  })
  .factory('CSAPIBaseData', function() {
    return {
      tokens: {
      }
    }
  });


// live example with HTTP Basic Auth
/*
 .constant('API_ENDPOINT', {
 host: 'http://yourserver.com',
 path: '/api/v2',
 needsAuth: true,
 username: 'whatever',
 password: 'foobar'
 });
 */
