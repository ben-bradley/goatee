'use strict';

angular.module('todos')
  .controller('MainCtrl', function ($scope, TodosService, UserService) {

    $scope.$on('user.change', function(user) {
      $scope.signedIn = UserService.signedIn;
      $scope.error = UserService.error;
    });

    $scope.$on('todos.updated', function() {
      $scope.todos = TodosService.list;
    });

    $scope.newTodos = function() {
      TodosService.newTodos({ description: $scope.description });
      $scope.description = '';
    };

    TodosService.getTodos();
  });
