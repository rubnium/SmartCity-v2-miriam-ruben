var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Rutas de ficheros
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paradasRouter = require('./routes/paradas');
var bicicletasAforoRouter = require('./routes/bicicletasAforo');
var bicicletasDispRouter = require('./routes/bicicletasDisponibilidad');
var acusticaRouter = require('./routes/acustica');
var secureRouter = require('./routes/secure');

var app = express();

//Configuración .env y Mongo
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

var mongoose = require('mongoose');
require('dotenv').config();
//lee la URI del .env
mongoose.connect(process.env.MONGODB)
  .then(() => console.log('Mongo connection successful'))
  .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas en la API
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/paradas', paradasRouter);
app.use('/bicicletasAforo', bicicletasAforoRouter);
app.use('/bicicletasDisponibilidad', bicicletasDispRouter);
app.use('/acustica', acusticaRouter);
app.use('/secure', secureRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
