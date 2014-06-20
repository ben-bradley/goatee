'use strict';

angular.module('todos')
  .factory('UserService', function($http, $rootScope) {
    var user = {
      // boolean toggle for controllers
      signedIn: false,
      // property for user data
      data: {},
      // method to update the user session
      getSession: function() {
        $http
          .get('auth/session')
          .success(userChange)
      },
      // method to sign in the user
      signIn: function(email, password) {
        if (!email || !password)
          return userChange({ error: 'Missing email or password' })
        return $http
          .post('auth/signin', { email: email, password: password })
          .success(userChange)
      },
      // method to sign out the user
      signOut: function() {
        $http
          .get('auth/signout')
          .success(userChange)
      },
      signUp: function(email, password) {
        if (!email || !password)
          return userChange({ error: 'Missing email or password' })
        return $http
          .post('auth/signup', { email: email, password: password })
          .success(userChange)
      }
    };

    // handler for user chages
    function userChange(data) {
      if (data._id) { // user is logged in w/ valid session
        user.signedIn = true;
        user.data = data;
        user.error = null;
      }
      else if (data.signedOut) {
        user.signedIn = false;
        user.data = {};
        user.error = null;
      }
      else if (data.error) {
        user.error = data.error;
      }
      $rootScope.$broadcast('user.change');
    }

    return user;
  })
