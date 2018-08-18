var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var auth = require('./middleware');
var jwt  = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var ObjectID = mongodb.ObjectID;
const uuidV4 = require('uuid/v4');

var USERS_COLLECTION = "users";

var app = express();
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());



  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });


// USERS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get('/',function(req,res){
  res.sendFile(__dirname+'/views/index.html');
});

