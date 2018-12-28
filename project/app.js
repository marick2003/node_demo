var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var parseurl = require('parseurl');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//console.log(fireData);
var fireData=require('./public/js/firebaseadmin');

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


var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie:{maxAge: 100*1000}
}))
// app.use(function (req, res, next) {
//   if (!req.session.views) {
//     req.session.views = {}
//   }
//   if (!req.session.username) {
//     req.session.username = {}
//   }
//   if (!req.session.email) {
//     req.session.email = {}
//   }  
//   // get the url pathname
//   var pathname = parseurl(req).pathname

//   // count the views
//   req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

//   next()
// })


app.use('/', indexRouter,function(req, res, next){
 
  //fireData.ref('todos').once('value',function(snapshot){
   // console.log(snapshot.val());
    //var data=snapshot.val();
    // var title=data.title;
    // console.log(title);
    // console.log(title);

    ///render 不能執行用兩次以上
    //res.render('index',{"todolist":data})
    
   // }); 
  
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
