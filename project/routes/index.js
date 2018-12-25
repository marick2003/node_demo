var express = require('express');
var router = express.Router();



  //then 回傳
// fireData.ref('todos').set({"title":"hello"}).then(function(){
//   fireData.ref('todos').once('vaule',function(snapshot){

//     console.log('asa');

//   })
// })
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  fireData.ref('todos').once('value',function(snapshot){
    console.log(snapshot.val());
    var data=snapshot.val();
    var title=data.title;
    res.render('index',{"title":title});
    
    });


  
});

module.exports = router;
