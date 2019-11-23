var express = require('express');
var app = express();
var dates = [] ;


app.post('/', function (req, res) {
    console.log(req.query.temperatura);
    console.log(req.query.humitat);
    dades.push(
        {
            temperatura: req.query.temperatura,
            humitat: req.query.humitat
        });
    res.send("data saved");
});

app.get('/', function (req, res) {
    res.send(dades);
});



