const express = require('express');
const requrest = require('request');
const bodyParser = require("body-parser");
var port = process.env.PORT || 8080;

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use('/assets', express.static('assets'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/views/signup.html");
});

app.post('/');

app.listen(port,()=>{
    console.log("Server Up At "+port)
});