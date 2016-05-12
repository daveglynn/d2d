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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
 
db.sequelize.sync({force: false }).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT);
	});
});