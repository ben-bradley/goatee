'use strict';

angular
  .module('todos', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/blargh', {
        templateUrl: 'views/blargh.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
