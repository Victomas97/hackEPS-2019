const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => console.log('Listening on ${ PORT }'));
