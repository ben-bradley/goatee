var auth = require('express').Router(),
    User = require('./models/user'),
    passport = require('passport');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

require('./auth/signin')(auth, passport);
require('./auth/signup')(auth, passport);
require('./auth/signout')(auth, passport);
require('./auth/session')(auth, passport);

module.exports = auth;
