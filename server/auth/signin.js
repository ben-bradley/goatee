var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

module.exports = function(auth, passport) {

  // build the HTTP route :: POST /auth/signin
  auth.route('/signin')
    .post(passport.authenticate('local-signin', {
      successRedirect: '/auth/session',
      failureRedirect: '/auth/session?error=Invalid credentials'
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
        return done(null, false);
//      var cookie = req.headers.cookie,
//          sid = cookie.match(/connect.sid=s%3A([^;]+);*/)[1];
//      sessions[user._id] = sid;
      return done(null, user);
    })
  }));

}
