const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
require('dotenv').config();

var port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/signup.html");
});

app.post('/', (req, res) => {
    var name = req.body.fName;
    var email = req.body.Email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    var url = "https://us4.api.mailchimp.com/3.0/lists/" + process.env.UNIQUE_ID;

    var mailchimp_req = {
        url: url,
        method: "POST",
        headers: {
            "Authorization": "ishandeveloper " + process.env.API_KEY
        },
        body: jsonData
    };
    request(mailchimp_req, (e, response, body) => {
        if (response.statusCode == 200) {
            res.sendFile(__dirname+"/views/success.html");
        }
        else {
            res.sendFile(__dirname+"/views/failure.html");
        }  
    });
});

app.listen(port, () => {
    console.log("Server Up At " + port)
});