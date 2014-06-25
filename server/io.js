// Keep the IO modules external to server.js
// =========================================
module.exports = function(io, sessionStore) {
  io.use(function(socket, next) {
    var cookie = socket.handshake.headers.cookie,
        sid = cookie.match(/connect.sid=s%3A([^\.]+)\.*/);

    if (sid)
      sid = sid[1];
    else
      return next('no session', false);

    sessionStore.get(sid, function(err, session) {

      if (!session)
        return next('no session', false);

      var checkSession = setInterval(function() {
        sessionStore.get(sid, function(err, session) {
          if (!session) {
            socket.disconnect(true);
            clearInterval(checkSession);
          }
        });
      }, 5000);

      next();

    });

  });

  require('./io/time')(io);
  require('./io/ping')(io);
}
