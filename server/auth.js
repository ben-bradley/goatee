var auth = require('express').Router(),
    User = require('./models/user'),
    passport = require('passport');

passport.serializeUser(function(user, done) {
  // `user` is the record as returned by mongo
  // whatever is returned as the second argument is assigned to:
  // req.session.passport.user
  done(null, { _id: user._id, email: user.local.email });
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

if (process.env.ENV == 'dev') {
  require('./auth/test')(auth, passport);
}

module.exports = auth;
