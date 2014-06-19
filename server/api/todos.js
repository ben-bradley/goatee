var Todos = require('../models/todos.js');

module.exports = function(api, mw) {

  // middleware to verify users
  api.use('/todos', mw.isLoggedIn);

  // VERB /api/todos
  api.route('/todos')

    // get all todos :: GET /api/todos
    .get(function(req, res) {
      Todos.find({ user: req.session.passport.user }, function(err, todos) {
        res.send(err || todos);
      });
    })

    // add a todo :: POST /api/todos
    .post(function(req, res) {
      var todo = new Todos(req.body);
      todo.user = req.session.passport.user;
      todo.save(function(err) {
        res.send(err || todo);
      });
    });

  // middleware to verify user
  api.use('/todos/:id', mw.isLoggedIn);

  // VERB /api/todos/123456789
  api.route('/todos/:id')

    // get a specific todo :: GET /api/todos/123456789
    .get(function(req, res) {
      Todos.findById(req.params.id, function(err, todo) {
        res.send(err || todo);
      });
    })

    // update a todo :: POST /api/todos/123456789
    .put(function(req, res) {
      Todos.findById(req.params.id, function(err, todo) {
        if (err)
          res.send(err);
        for (var p in req.body) {
          todo[p] = req.body[p];
        }
        todo.save(function(err) {
          res.send(err || todo);
        });
      });
    })

    // delete a todo :: DELETE /api/todos/123456789
    .delete(function(req, res) {
      Todos.remove({ _id: req.params.id }, function(err, todo) {
        res.send(err || { deleted: req.params.id });
      });
    });

};
