var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var dades = [] ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/', function (req, res) {
    console.log(req.body);
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

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});



