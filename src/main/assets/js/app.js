'use strict';

var app = angular.module('angular-with-maven', [
  'templates-all',
  'ui.router',
  'ngDialog',
  'toastr',
  'permission',
  'permission.ui',
  'validation.match',
  'pascalprecht.translate'
]);

app.config(($stateProvider, $urlRouterProvider, $httpProvider) => {

  $httpProvider.interceptors.push(($templateCache) => {
    return {
      request: (request) => {

        if(request.method === 'GET' && request.url.indexOf('.html') > 0 && !$templateCache.get(request.url)) {
          request.url = request.url.split('.').join('.en.');
        }

        return request;
      }
    };
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/pages/main.html',
    controller: 'MainConrtoller'
  });

});

app.controller('MainConrtoller', ($scope, $window) => {

    $scope.sayHello = () => {
      $window.alert('Hello Angular with Maven!');
    };

});

angular.module('angular-with-maven').run(() => {});
