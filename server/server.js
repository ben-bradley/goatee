// Require the dependencies
// ========================
var express       = require('express'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    http          = require('http'),
    socketio      = require('socket.io'),
    config        = require('./config');

// Assign the arguments
// ====================
var args = {};
process.argv.forEach(function(arg) {
  arg = arg.match(/^--([^\=]+)=(.+)/);
  if (arg) args[arg[1]] = arg[2];
});

// Declare global statics
// ======================
var ENV = process.env.ENV =
      process.env.ENV ||
      args.env ||
      'dev';
var PORT = process.env.PORT =
      process.env.PORT ||
      args.port ||
      config[ENV].server.port ||
      8080;

// Connect to Mongo
// ================
mongoose.connect(config[ENV].mongo.connectionString());

// Init the server
// ===============
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var sessionStore = new session.MemoryStore();

// Configure the server
// ====================
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  store: sessionStore,
  secret: ''+new Date().getTime()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+'/../client')); // serve the client
app.use('/auth', require('./auth')()); // load the authentication
app.use('/api', require('./api')()); // load the API

// Load the Socket.IO
// ==================
require('./io')(io, sessionStore);

// Kick this pig!
// ==============
server.listen(PORT);
console.log('app listening on '+config[ENV].server.uri())

// Mmm, bacon!
// ===========

/*
Inspired by:
  http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
  http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
*/
