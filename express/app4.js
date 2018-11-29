var express = require('express');
var app = express();

var engine=require('ejs-locals');
app.engine('ejs',engine);
///page views 關鍵字
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))

app.get('/',function(req,res){
    // res.send('<html><head></head><body><h1>1234index</h1></body></html>')
    res.render('index',{'title':'六角學院',
    'show':true,
    'boss':'liao'});
})
app.get('/user',function(req,res){
    // res.send('<html><head></head><body><h1>1234index</h1></body></html>')
    res.render('user');
})
// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);