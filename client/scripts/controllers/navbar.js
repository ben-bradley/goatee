'use strict';

angular.module('todos')
  .controller('NavbarCtrl', function ($scope, UserService) {

    $scope.$on('user.change', function(user) {
      $scope.signedIn = UserService.signedIn;
      $scope.error = UserService.error;
      if ($scope.error)
        $('#signInError').tooltip('show'); // this isn't working =(
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
