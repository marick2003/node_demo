var express = require('express');
var app = express();

var login= function(req,res,next){

    console.log("你是登入狀態2");
    next()
    
}
app.get('/',login,function(req,res){

    res.send('<html><head></head><body><h1>1234index</h1></body></html>')

})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);