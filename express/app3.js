var express = require('express');
var app = express();

var login= function(req,res,next){

    console.log("你是登入狀態2");
    var _url=req.url;
    if(_url=='/'){

        next()
    }else{

        console.log("error");
    }
   
    
}
app.use(function(req,res,next){
    res.status(404).send('抱歉，您的頁面找不到')
})

app.use(function(err,req,res,next){
    res.status(500).send('程式有些問題，請稍後嘗試')
})

app.get('/',login,function(req,res){

    res.send('<html><head></head><body><h1>1234index</h1></body></html>')

})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);