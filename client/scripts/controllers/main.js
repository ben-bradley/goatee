'use strict';

angular.module('todos')
  .controller('MainCtrl', function ($scope, TodosService, UserService) {

    $scope.$on('user.change', function(user) {
      $scope.signedIn = UserService.signedIn;
      if ($scope.signedIn === true)
        TodosService.getTodos();
      $scope.error = UserService.error;
    });

    $scope.$on('todos.updated', function() {
      $scope.todos = TodosService.list;
      if ($scope.todos.error)
        return $scope.todos.error;
      $scope.todos.reverse();
    });

    $scope.newTodos = function() {
      TodosService.newTodos({ description: $scope.description });
      $scope.description = '';
    };

  });
