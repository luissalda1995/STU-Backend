var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportConfig = require('./config/passport');
var expressSession = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var carreras = require('./routes/carreras');
var materias = require('./routes/materias');
var profesores = require('./routes/profesores');
var examenes = require('./routes/examenes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({secret: 'mySecretKey',
                       resave: true,
                       saveUninitialized: true}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
passportConfig(passport);

app.use('/', routes);
app.use('/', users);
app.use('/', carreras);
app.use('/', materias);
app.use('/', profesores);
app.use('/', examenes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
