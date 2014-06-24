// Keep the IO modules external to server.js
// =========================================
module.exports = function(io, app) {
  require('./io/time')(io);
  require('./io/ping')(io, app);
}
