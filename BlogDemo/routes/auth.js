var express = require('express');
var router = express.Router();
var firebase=require('../connections/firebase_connect');
var fireAuth=firebase.auth();
var firebaseDb=require('../connections/firebase_admin');


//var storage = firebase.storage("gs://demotest-4eea8.appspot.com");


//console.log('fireAuth'+fireAuth);

router.get('/',function(req,res,next){
    var auth=req.session.uid;
    //auth=true;
    console.log("session-uid"+auth);




    if(auth){

        const userRef=firebaseDb.ref('/user/auth');
        userRef.once('value').then(function(snapshot){

            const userdata= snapshot.val();
            
            res.render('auth/index', { 
                title: 'Express',
                auth,
                userdata
            });

        });

    }else{

      res.redirect('signin');
      
    }

  });

  ////首頁編輯
router.post('/upload',function(req,res){

    var auth=req.session.uid;
    // Points to the root reference
    //var storageRef = firebase.storage().ref();
    var sampleFile = req.files.fileUploaded;
    var user_name=req.body.name;
    var saveUser={
        'name': user_name
    }
    firebaseDb.ref('/user/'+auth).update(saveUser);

    
    //console.log('FIRST TEST: ' + file.fileUploaded);
    console.log('second TEST: ' +sampleFile.name);

    //存在伺服器
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('user_data/'+auth+'.jpg', function(err) {
        if (err)
        return res.status(500).send(err);
        // res.send('File uploaded!');
        // res.end();
       
    }).then(function(){
        res.redirect('/auth');
    });

    




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
        res.redirect('/auth');
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
   // checkauth(auth,res);
    var email= req.body.email;
    var password=req.body.password;
    var name=req.body.name;

    fireAuth.createUserWithEmailAndPassword(email,password)
    .then(function(user){
       console.log(user.user.uid);
        var saveUser={
            'email': email,
            'uid':user.user.uid,
            'name': name
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
let checkauth=function(e,res){

       // return new Promise(function(resolve,reject){
            if(!e){
                res.redirect('/auth/signin');

            }else{

                res.redirect('/auth');
            }
       // })
    
}
module.exports = router;