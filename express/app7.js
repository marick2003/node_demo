var express=require('express');
var app=express();
var engine=require('ejs-locals');
var bodyParser=require('body-parser');
app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(req,res){

    res.send('now page index');
    console.log('有人造訪首頁');

})
app.get('/search',function(req,res){

    res.render('search');

})

app.post('/searchList',function(req,res){
    console.log(req.body);
    //轉址
    res.redirect('search');
   // res.render('search');
})
app.post('/searchAJAX',function(req,res){
   console.log(req.body);
   res.send('hello!');

})

var port=process.env.PORT || 3000;
app.listen(port);