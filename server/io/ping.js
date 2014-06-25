module.exports = function(io) {

  // SOCKET.IO CONFIGURATION
  // =======================
  io
    .of('/io/ping')
    .on('connection', function(socket) {
      setInterval(function() { // every 1 sec, send the current timestamp to the browser
        socket.emit('pong', { pong: new Date() });
      }, 1000);
    });

};
