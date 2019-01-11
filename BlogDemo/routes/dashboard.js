var express = require('express');
var router = express.Router();
var firebaseAdminDb=require('../connections/firebase_admin');

 router.get('/article', function(req, res, next) {
    res.render('dashboard/article', { title: 'Express' });
  });
  
  router.get('/archives', function(req, res, next) {
    res.render('dashboard/archives', { title: 'Express' });
  });
  
  router.get('/categories', function(req, res, next) {
    res.render('dashboard/categories', { title: 'Express' });
  });
  
router.post('/categories/create',function(req,res){

    const data=req.body;
    console.log(data);


});
module.exports = router;