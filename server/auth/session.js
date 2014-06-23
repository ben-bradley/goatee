module.exports = function(auth, passport) {

  // build the HTTP route :: GET /auth/session
  auth.route('/session')
    .get(function(req, res) {
      if (req.session.passport.user)
        return res.send(req.session.passport.user);
//      var err = req.query.error || {};
//      err._id = null;
//      res.send(err);
      else
        res.send({
          _id: null,
          error: req.query.error
        });
//      return res.send(req.session.passport.user || req.query);
    });

}
