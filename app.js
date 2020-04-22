const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
require('dotenv').config();

var port = process.env.PORT || 8080;

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use('/assets', express.static('assets'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/views/signup.html");
});

app.post('/',(req,res)=>{
    var name=req.body.fName;
    var email=req.body.Email;
    var url="https://us4.api.mailchimp.com/3.0/lists/"+process.env.UNIQUE_ID;

    var mailchimp_req={
        url: url,
        method:"POST",
        headers:{
            "Authorization":"ishandeveloper "+process.env.API_KEY
        }
    };
    request(mailchimp_req,(e,res,body)=>{
        if(e){
            console.log(e);
        }
        else{
            console.log(res.statusCode);
        }
    });

});

app.listen(port,()=>{
    console.log("Server Up At "+port)
});