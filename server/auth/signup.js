var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

module.exports = function(auth, passport) {

  // build the HTTP route :: POST /auth/signup
  auth.route('/signup')
    .post(passport.authenticate('local-signup', {
      successRedirect: '/auth/session',
      failureRedirect: '/auth/session?error=Email already registered'
    }));

  // add new users
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, false);
        } else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              return done(err);
            return done(null, newUser);
          });
        }
      });
    });
  }));

}
