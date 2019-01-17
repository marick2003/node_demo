var express = require('express');
var router = express.Router();
var firebase=require('../connections/firebase_connect');
var fireAuth=firebase.auth();

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
        // res.redirect('/');
        console.log("login success");

    }).catch(function(error){
        // res.redirect('/');
        console.log("login error");
    });

})
///註冊
router.get('/signup', function(req, res) {
    var auth=req.session.uid;
    res.render('auth/signup', {
        title: 'Express',
        auth  
    });
});
///註冊判斷



module.exports = router;