'use strict';

describe('main controller', function () {

  beforeEach(module('angular-with-maven'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

	it('should say hello', function () {
    var $scope = {},
        helloMessage = '',
        $window = {
          alert: function(msg) {
            helloMessage = msg;
          }
        };

	  $controller('MainConrtoller', { $scope: $scope, $window: $window });
    $scope.sayHello();

    expect(helloMessage).toBe('Hello Angular with Maven!');
	});

});
