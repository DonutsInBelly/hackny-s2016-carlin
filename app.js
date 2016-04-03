var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser');
var fs = require('fs');
var config = require('./config/config.js');
var client = new twilio.RestClient(config.twilio_sid, config.twilio_auth_token);

app.use(bodyParser.json());

app.post('/push', function(req, res) {
    var filename = req.body.head_commit.timestamp;
    console.log(req.body.pusher);
    fs.writeFile("./logs/"+filename+".txt", req.body, function(err) {
	if(err) {
	    return console.log(err);
	}
    });
    client.messages.create({
	body: req.body.pusher.name + " has just pushed to the repo!",
	to: config.users,
	from: "+14432017260"
    });
    client.messages.create({
	body: req.body.pusher.name + " has just pushed to the repo!",
	to: config.pusher.number,
	from: "+14432017260"
    });
});

app.post('/alert', function(req, res) {
    client.messages.create({
	body: config.pusher.name + " destroyed all your work, came into your house knocked your shit over. :(",
	to: config.users,
	from: "+14432017260"
    }, function(error, message){
	if(error) {
	    console.log(error.message);
	}
    });
    client.messages.create({
	body: "You done goofed!",
	to: config.pusher.number,
	from: "+14432017260"
    }, function(error, message){
	if(error) {
	    console.log(error.message);
	}
    });
});

app.listen(8080);
