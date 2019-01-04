var express = require('express');
var router = express.Router();
var firebaseDb=require('../connections/connect_firebase_admin')
router.post('/', function (req, res) {
    
    // req.check("content","內容不得為空值");
    // var errors= req.validationResult();
    // console.log(errors);
    firebaseDb.ref('user/'+req.session.uid).once('value',function(snapshot){
        var nickname=snapshot.val().nickname;
        ///create new data
        var ref=firebaseDb.ref('list').push();
        var listnConent= {
            nickname: nickname,
            content: req.body.content
        }
        ///save new message
        ref.set(listnConent).then(function(){
            res.redirect('/');
        })
    })
})
module.exports = router;