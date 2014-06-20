var User = require('../models/user');

module.exports = function(auth, passport) {

  // build the HTTP route :: POST /auth/signup
  auth.route('/test/users')
    .get(function(req, res) {
      User.find(function(err, users) {
        res.send(err || users);
      });
    });

  auth.route('/test/users/delete/:id')
    .get(function(req, res) {
      var id = req.params.id;
      if (id === 'all') {
        User.remove({}, function(err) {
          res.send(err);
        });
      }
      else {
        User.remove({ _id: req.params.id }, function(err) {
          res.send(err);
        });
      }
    });

}
