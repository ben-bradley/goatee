var api = require('express').Router();

// custom middleware
var mw = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated())
      return next()
    res.send({ error: 'not logged in' });
  }
};

require('./api/ping')(api, mw);
require('./api/todos')(api, mw);

module.exports = api;
