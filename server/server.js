// Require the dependencies
// ========================
var express       = require('express'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    flash         = require('connect-flash'),
    config        = require('./config');

// Declare global statics
// ======================
var ENV = process.env.ENV || 'dev';
var PORT = process.env.PORT || config[ENV].server.port || 8080;

// Connect to Mongo
// ================
mongoose.connect(config[ENV].mongo.connectionString());

// Init the server
// ===============
var app = express();

// Configure the server
// ====================
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: ''+new Date().getTime() }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname+'/../client')); // serve the client
app.use('/auth', require('./auth')); // load the authentication
//app.use('/auth', require('./auth')(passport)); // load the authentication
app.use('/api', require('./api')); // load the API

// Kick this pig!
// ==============
app.listen(PORT);
console.log('app listening on '+config[ENV].server.uri())

// Mmm, bacon!
// ===========

// Inspired by http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
