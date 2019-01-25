var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboard = require('./routes/dashboard');

///登入 註冊
var auth = require('./routes/auth');
var session=require("express-session");
var flash =require("connect-flash");


///上傳檔案
const fileUpload = require('express-fileupload');

var app = express();

// default options
app.use(fileUpload());

/////
app.use(session({
  
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,  
  cookie:{
    maxAge:600*1000  //10分鐘到期
    
  }

}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',require('express-ejs-extend'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboard);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // next(createError(404));
 var err=new Error('Not Founf');
 err.status=404;
 res.render('error',{
  message:'您查看頁面不存在'
 });
 


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
