var express = require('express');
var router = express.Router();
var firebaseAdminDb=require('../connections/firebase_admin');

const categoriesRef=firebaseAdminDb.ref('/categories')

 router.get('/article', function(req, res, next) {
    res.render('dashboard/article', { title: 'Express' });
  });
  
  router.get('/archives', function(req, res, next) {
    res.render('dashboard/archives', { title: 'Express' });
  });
  
  router.get('/categories', function(req, res, next) {
    categoriesRef.once('value').then(function(snapshot){
     
      const categories=snapshot.val();
      console.log(categories);
      res.render('dashboard/categories', { 
        title: 'Express',
        categories
       });
    });


    
  });
  
router.post('/categories/create',function(req,res){

    const data=req.body;
    console.log(data);
    const categoryRef = categoriesRef.push();
    const key= categoryRef.key;
    data.id=key;
    categoryRef.set(data).then(function(){

        res.redirect('/dashboard/categories');
    })


});
module.exports = router;