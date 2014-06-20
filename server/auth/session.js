module.exports = function(auth, passport) {

  // build the HTTP route :: GET /auth/session
  auth.route('/session')
    .get(function(req, res) {
      return res.send(req.session.passport.user || req.query);
    });

}
