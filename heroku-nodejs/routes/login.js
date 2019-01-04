var express = require('express');
var router = express.Router();
var firebase=require('../connections/firebase_connect');
var firebaseDb=require('../connections/connect_firebase_admin');
var fireAuth=firebase.auth();

router.get('/', function (req, res) {
    res.render('login', { title: '登入' });
})
router.post('/', function (req, res) {
    fireAuth.signInWithEmailAndPassword(req.body.email,req.body.passwd)
    .then(function(user){
        console.log(user.user);
        req.session.uid = user.user.uid;
        res.redirect('/');
        console.log("login success");

    }).catch(function(error){
        res.redirect('/');
        console.log("login error");
    });
})
module.exports = router;