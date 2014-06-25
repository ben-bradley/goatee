module.exports = function(auth, passport) {

  // build the HTTP route :: GET /auth/session
  auth.route('/session')
    .get(function(req, res) {
      if (req.session.passport.user) {
//        res.cookie('user._id', req.session.passport.user._id);
        return res.send(req.session.passport.user);
      }
      else {
//        res.clearCookie('user._id');
        return res.send({
          _id: null,
          error: req.query.error
        });
      }
    });

}
