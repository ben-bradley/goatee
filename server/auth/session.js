module.exports = function(auth, passport) {

  // build the HTTP route :: GET /auth/session
  auth.route('/session')
    .get(function(req, res) {
      if (req.session.passport.user)
        return res.send(req.session.passport.user);
      else
        res.send({
          _id: null,
          error: req.query.error
        });
    });

}
