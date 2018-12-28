var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//console.log(fireData);
var fireData=require('./public/js/firebaseadmin');


var session = require('express-session');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//增加靜態檔案的路徑
app.use(express.static('public'));


app.use('/', indexRouter,function(req, res, next){
 
  fireData.ref('todos').once('value',function(snapshot){
    console.log(snapshot.val());
    var data=snapshot.val();
    // var title=data.title;
    // console.log(title);
    // console.log(title);

    ///render 不能執行用兩次以上
    res.render('index',{"todolist":data})
    
    }); 
  
});
app.use('/users', usersRouter);

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
