var express = require('express');
var router = express.Router();

var fireData=require('../public/js/firebaseadmin');


//then 回傳
// fireData.ref('todos').set({"title":"hello"}).then(function(){
//   fireData.ref('todos').once('vaule',function(snapshot){

//     console.log('asa');

//   })
// })
/* GET home page. */



router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    
    // req.session.username="tom";
    // req.session.email="email";
    console.log(req.session);
    //console.log('you viewed this page ' + req.session.views['/'] + ' times');
    res.cookie('name','mary',{
        maxAge:1000000,
        httpOnly:true

    })
  fireData.ref('todos').once('value',function(snapshot){
    //console.log(snapshot.val());
    var data=snapshot.val();
    // var title=data.title;
    // console.log(title);
    // console.log(title);

    ///render 不能執行用兩次以上
    res.render('index',{
    "todolist":data,
    username: req.session.username,
    email: req.session.email

    })
    
    }); 
});
///

router.post('/',function(req,res){

    req.session.username=req.body.username;
    req.session.email=req.body.email;
    console.log(req.session);
    res.redirect('/');

})


// 新增邏輯
router.post('/addTodo',function(req,res){
  console.log(req.body.content);
  var content = req.body.content;
  
  var contentRef = fireData.ref('todos').push();
  
  contentRef.set({"content":content})
  .then(function(){
      fireData.ref('todos').once('value',function(snapshot){
          res.send(
              {
                  "success": true,
                  "result": snapshot.val(),
                  "message": "資料讀取成功"
              }
          );
      })
  })
})

// 刪除邏輯
router.post('/removeTodo',function(req,res){
  var _id = req.body.id;
  fireData.ref('todos').child(_id).remove()
  .then(function(){
      fireData.ref('todos').once('value',function(snapshot){
          res.send(
              {
                  "success": true,
                  "result": snapshot.val(),
                  "message": "資料刪除成功"
              }
          )
      })
  })
})



module.exports = router;
