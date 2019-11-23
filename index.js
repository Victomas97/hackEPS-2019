const express = require('express');
const path = require('path');
const app = express();


app.use(express.json())
app.use (express.urlencoded({extended: false}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/temp', (req, res) => {
    console.log(req.body);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
