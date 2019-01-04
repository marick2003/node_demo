var express = require('express');
var router = express.Router();
var firebaseDb=require('../connections/connect_firebase_admin')

router.get('/', function (req, res) {
    firebaseDb.ref('user/'+req.session.uid).once('value',function(snapshot){

        res.render('user', { title: '會員專區',nickname: snapshot.val().nickname});
    })
    
   
})
module.exports = router; 