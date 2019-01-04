var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
////
var validator= require('express-validator');

// routes
var routes = require('./routes/index');
var login = require('./routes/login');
var messageBoard = require('./routes/messageBoard');
var signup = require('./routes/signup');
var user = require('./routes/user');

var app = express();

/////check puls
app.use(validator());


/////session
var session=require("express-session");
app.use(express.static("public"));
app.use(session({
secret:'mysupersecret',
resave:true,
saveUninitialized:true

}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
///sass 轉換
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
var flash = require('connect-flash');
app.use(flash());
app.use('/', routes);
app.use('/login', login);
app.use('/signup', signup);

app.use('/messageBoard', messageBoard);

///check login
app.use(function(req,res,next){

  if(req.session.uid){

    return next();

  }
    res.redirect('/');
})


app.use('/user', user);
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
