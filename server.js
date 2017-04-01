var express=require('express');
var PORT=8080;
var app=express();

app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Running at '+PORT);
    }
})
