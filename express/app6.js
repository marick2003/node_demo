var express = require('express');
var app = express();
var engine=require('ejs-locals');
var bodyParser=require('body-parser');

app.engine('ejs',engine);
///page views 關鍵字
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))


//增加body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{extended:false}));

app.get('/',function(req,res){
 res.send('你現在進入是首頁');
 console.log('友人造訪首頁')
})
app.get('/search',function(req,res){
 res.render('search');


})
app.post('/searchList',function(req,res){

    console.log(req.body);

})
// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);