module.exports = function(api) {

  // GET /api/ping
  api.route('/ping')
    .get(function(req, res) {
      res.send({ pong: new Date() });
    });

};
