                        
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/
 
/******************************************************************************************************
 database
******************************************************************************************************/
"use strict";
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	var Sequelize = require("sequelize");
	var sequelize = new Sequelize('d2d', 'postgres', 'Houses22', {
		host: "localhost",
		port: 5432,
		dialect: 'postgres'
	});
	//
	//sequelize = new Sequelize(undefined, undefined, undefined, {
	//	'dialect': 'sqlite',
	//	'storage': __dirname + '/data/dev-todo-api.sqlite'
	//});
}

var db = {};

db.profile = sequelize.import(__dirname + '/api/models/profile.model.js');
db.language = sequelize.import(__dirname + '/api/models/language.model.js');
db.tenant = sequelize.import(__dirname + '/api/models/tenant.model.js');
db.order = sequelize.import(__dirname + '/api/models/order.model.js');
db.todo = sequelize.import(__dirname + '/api/models/todo.model.js');
db.user = sequelize.import(__dirname + '/api/models/user.model.js');
db.token = sequelize.import(__dirname + '/api/models/token.model.js');
db.list = sequelize.import(__dirname + '/api/models/list.model.js');
db.item = sequelize.import(__dirname + '/api/models/item.model.js');
db.ruleBook = sequelize.import(__dirname + '/api/models/ruleBook.model.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//db.order.belongsTo(db.tenant,{constraints: true});
//db.tenant.hasMany(db.order,{constraints: true});

db.profile.belongsTo(db.tenant);
db.tenant.hasMany(db.profile);

db.order.belongsTo(db.tenant);
db.tenant.hasMany(db.order);

db.user.belongsTo(db.tenant);
db.tenant.hasMany(db.user);
 
db.todo.belongsTo(db.tenant);
db.tenant.hasMany(db.todo);

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

db.user.belongsTo(db.profile);
db.profile.hasMany(db.user);

db.user.belongsTo(db.language);
db.language.hasMany(db.user);

db.item.belongsTo(db.list);
db.list.hasMany(db.item);
 
db.item.belongsTo(db.ruleBook);
db.ruleBook.hasMany(db.item);

module.exports = db;