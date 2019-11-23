var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
});

app.post('/temp',function(req,res){
    console.log(req.body);
    res.end("yes");
});

app.listen(8080,function(){
    console.log("Started on PORT 8080");
})
