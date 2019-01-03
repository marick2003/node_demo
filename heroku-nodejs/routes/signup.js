var express = require('express');
var router = express.Router();
var firebase=require('../connections/firebase_connect');
var fireAuth=firebase.auth();
var firebaseDb=require('../connections/connect_firebase_admin');

router.get('/', function (req, res) {
    res.render('signup', { title: '註冊'});
})

router.post('/', function (req, res) {
   var email= req.body.email;
   var password=req.body.passwd;
   var nickname=req.body.nickname;
    fireAuth.createUserWithEmailAndPassword(email,password)
    .then(function(user){
       console.log(user.user.uid);
        var saveUser={
            'email': email,
            'nickname': nickname,
            'uid':user.user.uid
        }
        firebaseDb.ref('/user/'+user.user.uid).set(saveUser);
        res.redirect('/signup/success');

    }).catch(function(error){
        var errorCode= error.code;
       var errormessage=error.message;
    //    auth/email-already-in-use
    //    Thrown if there already exists an account with the given email address.
    //    auth/invalid-email
    //    Thrown if the email address is not valid.
    //    auth/operation-not-allowed
    //    Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
    //    auth/weak-password
    //    Thrown if the password is not strong enough.

        switch(errorCode){
            case "auth/email-already-in-use":

            break;
            case "auth/invalid-email":

            break;
            case "auth/operation-not-allowed":

            break;
            case "auth/weak-password":
             alert('The password is too weak.');
            break;


        }


       //req.flash('error',errormessage);
       res.redirect('/signup');
        console.log(error);
    
    });
})
router.get('/success',function(req,res){
    res.render('success',{
        title:'註冊成功'
    });
})
module.exports = router;