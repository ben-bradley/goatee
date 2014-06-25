module.exports = function(auth, passport) {

  // build the HTTP route :: GET /auth/signout
  auth.route('/signout')
    .get(function(req, res) {
      req.logout();
      req.session.destroy();
      res.send({ signedOut: true });
    });

}
