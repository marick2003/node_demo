var express = require('express');
var router = express.Router();
var firebaseDb=require('../connections/connect_firebase_admin')
var firebase=require('../connections/firebase_connect');

router.get('/', function (req, res, next) {
  ///認證
  console.log(firebase.auth());

  ///test firebase
    firebaseDb.ref().once('value',function(snapshot){
   // console.log(snapshot.val());
   })
    res.render('index', {
        title: '六角學院留言板'
    });
});
/* GET home page. */
module.exports = router;