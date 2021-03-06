                        
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/
 
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

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
        
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