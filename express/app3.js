var express = require('express');
var app = express();
var login=function(req,res,next){
    var _url=req.url;
    console.log(_url);
    // if(_url!=='/'){
    //     next()
    // }else{

    // }
    next();
}

///要放第一個排序
app.get('/',login,function(req,res){
    res.send('<html><head></head><body><h1>1234index</h1></body></html>')
})
app.use(function(req,res,next){
    console.log('有人進來了');
    next();
})

app.use(function(req,res,next){
    res.status(404).send('抱歉，您的頁面找不到')
})

app.use(function(err,req,res,next){
    res.status(500).send('程式有些問題，請稍後嘗試')
})


// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);