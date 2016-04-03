var express = require('express');
var app = express();
var twilio = require('twilio');

app.post('/push', function(req, res) {
  console.log(req);
  console.log(res);
});

app.listen(8080);
