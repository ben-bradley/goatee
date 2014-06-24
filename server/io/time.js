module.exports = function(io) {

  // SOCKET.IO CONFIGURATION
  // =======================
  io
    .of('/io/time')
    .use(function(socket, next) {
//      console.log('/io/time auth = ',socket.request.isAuthenticated);
//      for (var a in socket.request) {
//        console.log(a);
//      }
      if (socket.request.isAuthenticated())
        next();
      else
        next(new Error('not logged in'));
    })
    .on('connection', function(socket) {
      setInterval(function() { // every 1 sec, send the current timestamp to the browser
        socket.emit('time', new Date());
      }, 1000);
    });

};
