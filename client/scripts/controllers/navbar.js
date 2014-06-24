'use strict';

angular.module('todos')
  .controller('NavbarCtrl', function ($scope, UserService, socket) {

    $scope.now = 'loading...';

    $scope.$on('user.change', function(user) {
      $scope.signedIn = UserService.signedIn;
      $scope.error = UserService.error;

      if ($scope.signedIn === true) {
        var ioTime = socket.connect('/io/time');
        ioTime.on('time', function(now) {
          $scope.now = now;
        });
        var ioPing = socket.connect('/io/ping');
        ioPing.on('pong', function(data) {
          console.log(data);
        });
      }
    });

    $scope.signOut = UserService.signOut;

    $scope.signIn = function() {
      UserService.signIn($scope.email, $scope.password);
      $scope.email = '';
      $scope.password = '';
    };

    $scope.signUp = function() {
      UserService.signUp($scope.email, $scope.password);
      $scope.email = '';
      $scope.password = '';
    };

    UserService.getSession();
  });
