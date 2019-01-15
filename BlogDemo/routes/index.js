var express = require('express');
var router = express.Router();
var firebaseAdminDb=require('../connections/firebase_admin');

const categoriesRef=firebaseAdminDb.ref('/categories');
const articlesRef=firebaseAdminDb.ref('/articles');

////標籤與日期轉換 套件
const stringtags=require('striptags');
const momont= require('moment');


// const ref= firebaseAdminDb.ref('any');
// ref.once('value',function(sanpshot){
//   console.log(sanpshot.val());
// });
/* GET home page. */
router.get('/', function(req, res, next) {
 
  let categories={};
  categoriesRef.once('value').then(function(snapshot){

    categories= snapshot.val();
   // console.log(categories);
    return articlesRef.orderByChild('update_time').once('value');
  }).then(function(snapshot){
   const  articles= [];
   snapshot.forEach(function(snapshotChild){

      //console.log('child'+snapshotChild.val());
     
        articles.push(snapshotChild.val());
     
      
   });
  // console.log(articles);
    res.render('index', {
       title: 'Express',
       categories,
       articles,
       stringtags,
       momont
      });
  });
  
});

router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Express' });
});


router.get('/dashboard/signup', function(req, res, next) {
  res.render('dashboard/signup', { title: 'Express' });
});

module.exports = router;
