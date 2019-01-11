var express = require('express');
var router = express.Router();
var firebaseDb=require('../connections/connect_firebase_admin')
var firebase=require('../connections/firebase_connect');

router.get('/', function (req, res, next) {
  var auth=req.session.uid;



  ///認證
  //console.log(firebase.auth());

  ///test firebase
    firebaseDb.ref("list").once('value',function(snapshot){
   // console.log(snapshot.val());
        var auth=req.session.uid;
        res.render('index', {
            title: '留言板demo',
            title: '留言板demos',
            auth: auth,
            list:snapshot.val()
        });
   })
    
});
/* GET home page. */
module.exports = router;