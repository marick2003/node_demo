var express = require('express');
var router = express.Router();
////標籤與日期轉換 套件
const stringtags=require('striptags');
const momont= require('moment');

var firebaseAdminDb=require('../connections/firebase_admin');

const categoriesRef=firebaseAdminDb.ref('/categories');
const articlesRef=firebaseAdminDb.ref('/articles');

  router.get('/',function(req,res,next){
    var auth=req.session.uid;
    console.log("session-uid"+auth);
    if(auth){

      res.render('dashboard/index', { 
        title: 'Express'
       });

    }else{

      res.redirect('/auth/signin');
      
    }

    
    
  });

 
   router.get('/article/create', function(req, res, next) {

      categoriesRef.once('value').then(function(snapshot){

        const categories= snapshot.val();
        // console.log('categories'+categories)
        res.render('dashboard/article', {
           title: 'Express',
           categories
        });
      });
    
  });
  
  router.post('/article/create',function(req,res){
    console.log(req.body);
    const data=req.body;
    const articleRef=articlesRef.push();
    const key= articleRef.key;
    const updateTime=Math.floor(Date.now()/1000);
    data.id=key;
    data.update_time=updateTime;
    console.log(data);
    articleRef.set(data).then(function(snapshot){

      res.redirect(`/dashboard/article/${data.id}`);
    });
    

  });
  router.post('/article/delete/:id',function(req,res){
   
    const id=req.param('id');
    ////更新資料
    articlesRef.child(id).remove().then(function(snapshot){

      req.flash('info','文章已刪除');
      res.send('文章已刪除');
      res.end();

    });
      //res.redirect(`/dashboard/article`);
    

    

  });
router.get('/article/:id', function(req, res, next) {
    const id=req.param('id');
    let categories= {}
    categoriesRef.once('value').then(function(snapshot){
      categories=snapshot.val();
     
      return articlesRef.child(id).once('value');
    }).then(function(snapshot){
      const article=snapshot.val();
      console.log(article);
        res.render('dashboard/article', {
          title: 'Express',
          categories,
          article
      });

    });
      // console.log('categories'+categories)
     
    
  
});


  router.get('/archives', function(req, res, next) {
    const status= req.query.status || 'public';
    console.log(status);
    let categories={};
    categoriesRef.once('value').then(function(snapshot){

      categories= snapshot.val();
     // console.log(categories);
      return articlesRef.orderByChild('update_time').once('value');
    }).then(function(snapshot){
     const  articles= [];
     snapshot.forEach(function(snapshotChild){

        //console.log('child'+snapshotChild.val());
        if(status===snapshotChild.val().status ){
          articles.push(snapshotChild.val());
        }
        
     });
    // console.log(articles);
      res.render('dashboard/archives', {
         title: 'Express',
         categories,
         articles,
         stringtags,
         momont,
         status
        });
    });
  });
  
  router.get('/categories', function(req, res, next) {
    categoriesRef.once('value').then(function(snapshot){
      const messages=req.flash('info');

      const categories=snapshot.val();
      console.log(categories);
      res.render('dashboard/categories', { 
        title: 'Express',
        messages: messages,
        hasInfo: messages.length>0,
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
    ///過濾相同路徑
    categoriesRef.orderByChild('path').equalTo(data.path).once("value").then(function(snapshot){
      if(snapshot.val()!==null){

          req.flash('info','已有相同路徑');
          res.redirect("/dashboard/categories");

      }else{
          categoryRef.set(data).then(function(){
            res.redirect('/dashboard/categories');
          })

      }

    });



});

router.post('/categories/delete/:id',function(req,res){

    const id= req.param('id');
    // console.log(id);
    req.flash('info','欄位已刪除')
    categoriesRef.child(id).remove();
    res.redirect('/dashboard/categories');
});
module.exports = router;