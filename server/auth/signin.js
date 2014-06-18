var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

module.exports = function(auth, passport) {

  // build the HTTP route :: POST /auth/signin
  auth.route('/signin')
    .post(passport.authenticate('local-signin', {
      successRedirect: '/#/signin/success',
      failureRedirect: '/#/signin/failure',
      failureFlash: true
    }));

  // authenticate the user
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email': email }, function(err, user) {
      if (err)
        return done(err);
      if (!user || !user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Invalid signin.'));
      return done(null, user);
    })
  }));

}
