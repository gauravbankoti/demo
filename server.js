var express=require('express');
var app=express();
var bodyParser = require('body-parser')
var PORT=8080;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/demo');

mongoose.connection.on('open', function (ref) {
    connected=true;
    console.log('open connection to mongo server.');
});

mongoose.connection.on('connected', function (ref) {
    connected=true;
    console.log('connected to mongo server.');
});

mongoose.connection.on('disconnected', function (ref) {
    connected=false;
    console.log('disconnected from mongo server.');
});

mongoose.connection.on('close', function (ref) {
    connected=false;
    console.log('close connection to mongo server');
});

mongoose.connection.on('error', function (err) {
    connected=false;
    console.log('error connection to mongo server!');
    console.log(err);
});

mongoose.connection.on('reconnected', function (ref) {
    connected=true;
    console.log('reconnect to mongo server.');
});


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static(__dirname + '/public'));
// app.use(function(req, res) {
//    res.sendFile(__dirname + '/public/index.html');
// });


var routes = require('./Routes/routes');
app.use('/api', routes);

app.listen(PORT,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Running at '+PORT);
    }
})
