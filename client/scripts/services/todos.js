'use strict';

angular.module('todos')
  .factory('TodosService', function($http, $rootScope) {

    var todos = {
      list: [],
      broadcast: function(ev) {
        $rootScope.$broadcast(ev || 'todos.updated');
      }
    };

    todos.getTodos = function() {
      $http
        .get('api/todos')
        .success(function(data) {
          todos.list = data;
          todos.broadcast();
        });
    };

    todos.newTodos = function(todo) {
      $http
        .post('api/todos', todo)
        .success(function(data) {
          todos.list.unshift(data);
          todos.broadcast();
        });
    }

    return todos;

  })
