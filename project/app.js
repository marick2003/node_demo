var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//console.log(fireData);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var fireData=require('./public/js/firebaseadmin');
app.use('/', indexRouter,function(req, res, next){
  
  
  
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


//新增邏輯
app.post('/addTodo',function(req,res){

  console.log("ass");
  var content=req.body.content;
  var contentRef=fireData.ref('todos').push();
  contentRef.set({"content":content}).then(function(){
    fireData.ref("todos").once('value',function(snapshot){

      res.send(snapshot.val());
    })
    
  })

})

module.exports = app;
