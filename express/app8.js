var express=require("express");
var app=express();

var user=require('./routes/user');

///設定主頁為 user
app.use('/user',user);

// app.get('/',function(req,res){

//     res.send('now page index');
//     console.log('有人造訪首頁');

// })
var port=process.env.PORT || 3000;
app.listen(port);