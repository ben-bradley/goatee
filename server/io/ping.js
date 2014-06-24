module.exports = function(io, app) {

  // SOCKET.IO CONFIGURATION
  // =======================
  io
    .of('/io/ping')
    .use(function(socket, next) {
      console.log('PING.js');
//      for (a in app.request.isAuthenticated()) {
//        console.log(a);
//      }
      console.log(app.request.isAuthenticated())

      if (socket.request.isAuthenticated())
        next();
      else
        next(new Error('not logged in'));
    })
    .on('connection', function(socket) {
      setInterval(function() { // every 1 sec, send the current timestamp to the browser
        socket.emit('pong', { pong: new Date() });
      }, 1000);
    });

};
