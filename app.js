/******************************************************************************************************
 main app
******************************************************************************************************/
"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var routes = require('./api/routes');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3000;

// allow cross browser
app.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers, "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
}); 

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());

app.use('/',routes);
 
db.sequelize.sync({force: true }).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT);
	});
});