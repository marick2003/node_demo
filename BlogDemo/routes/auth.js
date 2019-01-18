var express = require('express');
var router = express.Router();
var firebase=require('../connections/firebase_connect');
var fireAuth=firebase.auth();
var firebaseDb=require('../connections/firebase_admin');

//console.log('fireAuth'+fireAuth);

router.get('/',function(req,res,next){
    var auth=req.session.uid;
    console.log("session-uid"+auth);
    if(auth){
      res.render('auth/index', { 
        title: 'Express',
        auth
       });

    }else{

      res.redirect('signin');
      
    }

  });

router.get('/signin', function(req, res) {
    var auth=req.session.uid;
    res.render('auth/signin', {
        title: 'Express',
        auth
    });
});

///登入判斷
router.post('/signin',function(req,res){
    fireAuth.signInWithEmailAndPassword(req.body.email,req.body.password)
    .then(function(user){
        console.log(user.user);
        req.session.uid = user.user.uid;
         res.redirect('/dashboard/archives');
        console.log("login success");

    }).catch(function(error){
        //  res.redirect('/');
        console.log("login error");
    });

})
///
router.get('/signup', function(req, res) {
    var auth=req.session.uid;
    res.render('auth/signup', {
        title: 'Express',
        auth
    });
});

///註冊判斷
router.post('/signup', function(req, res) {
    var auth=req.session.uid;
    var email= req.body.email;
    var password=req.body.password;

    fireAuth.createUserWithEmailAndPassword(email,password)
    .then(function(user){
       console.log(user.user.uid);
        var saveUser={
            'email': email,
            'uid':user.user.uid
        }
        firebaseDb.ref('/user/'+user.user.uid).set(saveUser);
        req.session.uid = user.user.uid;
        res.redirect('/auth/signin');

    }).catch(function(error){
        
        var errorCode= error.code;

        console.log("errorCode"+errorCode);
        // var errormessage=error.message;
        //    auth/email-already-in-use
        //    Thrown if there already exists an account with the given email address.
        //    auth/invalid-email
        //    Thrown if the email address is not valid.
        //    auth/operation-not-allowed
        //    Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
        //    auth/weak-password
        //    Thrown if the password is not strong enough.

        // switch(errorCode){
        //     case "auth/email-already-in-use":

        //     break;
        //     case "auth/invalid-email":

        //     break;
        //     case "auth/operation-not-allowed":

        //     break;
        //     case "auth/weak-password":
        //      alert('The password is too weak.');
        //     break;


        // }

  
    });



}); 

    //Send a password reset email
    router.get('/forget', function(req, res) {
        var auth=req.session.uid;
        res.render('auth/forget', {
            title: 'Express',
            auth
        });
    });
    //Send a password reset email
    router.post('/forget',function(req, res){

        var emailAddress = req.body.email;
        fireAuth.sendPasswordResetEmail(emailAddress).then(function(user) {
            // Email sent.
            console.log(user);
            res.redirect('/auth/signin');
        }).catch(function(error) {
        // An error happened.
        console.log(error.code);
        });

    });

module.exports = router;