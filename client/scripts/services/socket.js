'use strict';

angular.module('todos')
  .service('socket', function($rootScope) {

    this.connect = function(namespace, options) {
      var _socket = io.connect(namespace, options);
      _socket._on = _socket.on;
      _socket._emit = _socket.emit;

      _socket.on = function(eventName, callback) {
        _socket._on(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(_socket, args);
          });
        });
      };

      _socket.emit = function(eventName, data, callback) {
        _socket._emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            if (callback) {
              callback.apply(_socket, args);
            }
          });
        });
      };

      return _socket;
    };

  })
