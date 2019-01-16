var express = require('express');
var router = express.Router();
var firebaseAdminDb=require('../connections/firebase_admin');

const converPagination=require('../modules/converPagination');

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
  ////取得頁數 並轉數值
  let getcurrentPage=Number.parseInt(req.query.page || 1);
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
  articles.reverse();
   ////分頁
   const data= converPagination(articles,getcurrentPage);
   console.log(data);

  // console.log(articles);
    res.render('index', {
       title: 'Express',
       categories,
       articles: data.data,
       stringtags,
       momont,
       page:data.page
      });
  });
  
});

router.get('/post/:id', function(req, res, next) {
  let categories={};
  const id=req.param('id');
  categoriesRef.once('value').then(function(snapshot){

    categories= snapshot.val();
   // console.log(categories);
    return articlesRef.child(id).once('value');
  }).then(function(snapshotChild){
   const  articles=[];
   //snapshot.forEach(function(snapshotChild){

      articles.push(snapshotChild.val());
      
   //});
  // console.log(articles);
    res.render('post', {
       title: 'Express',
       categories,
       articles,
       stringtags,
       momont
      });
  });
});


router.get('/dashboard/signup', function(req, res, next) {
  res.render('dashboard/signup', { title: 'Express' });
});

module.exports = router;
