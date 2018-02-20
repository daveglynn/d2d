                        
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
//var env = process.env.NODE_ENV || 'development';
var sequelize;

var env   = 'production';


 if (env === 'production') {
	sequelize = new Sequelize("process.env.DATABASE_URL", {
		dialect: 'postgres',
		define: {
					underscored: false,
					freezeTableName: true,
					charset: 'utf8',
					collate: 'utf8_general_ci'
				},		
    });
} else {
	var Sequelize = require("sequelize");
	var sequelize = new Sequelize('d2d_v1', 'postgres', 'Houses22', {
		host: "localhost",
		port: 5432,
		dialect: 'postgres',
		define: {
			underscored: false,
			freezeTableName: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
		// use pooling in order to reduce db connection overload and to increase speed
		// currently only for mysql and postgresql (since v1.5.0)
		pool: { maxConnections: 5, maxIdleTime: 30},
		
		language: 'en'		
    });
	//
	//sequelize = new Sequelize(undefined, undefined, undefined, {
	//	'dialect': 'sqlite',
	//	'storage': __dirname + '/data/dev-todo-api.sqlite'
	//});
}

var db = {};

db.access = sequelize.import(__dirname + '/api/models/access.model.js');
db.company = sequelize.import(__dirname + '/api/models/company.model.js');
db.division = sequelize.import(__dirname + '/api/models/division.model.js');
db.item = sequelize.import(__dirname + '/api/models/item.model.js');
db.language = sequelize.import(__dirname + '/api/models/language.model.js');
db.list = sequelize.import(__dirname + '/api/models/list.model.js');
db.object = sequelize.import(__dirname + '/api/models/object.model.js');
db.profile = sequelize.import(__dirname + '/api/models/profile.model.js');
db.role = sequelize.import(__dirname + '/api/models/role.model.js');
db.ruleBook = sequelize.import(__dirname + '/api/models/ruleBook.model.js');
db.tenant = sequelize.import(__dirname + '/api/models/tenant.model.js');
db.todo = sequelize.import(__dirname + '/api/models/todo.model.js');
db.token = sequelize.import(__dirname + '/api/models/token.model.js');
db.user = sequelize.import(__dirname + '/api/models/user.model.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.company.hasMany(db.access);
db.division.hasMany(db.access);
db.list.hasMany(db.item);
db.language.hasMany(db.user);
db.object.hasMany(db.access);
db.profile.hasMany(db.user);
db.profile.hasMany(db.access);
db.role.hasMany(db.user);
db.ruleBook.hasMany(db.access);
db.ruleBook.hasMany(db.company);
db.ruleBook.hasMany(db.division);
db.role.hasMany(db.object);
db.ruleBook.hasMany(db.profile);
db.ruleBook.hasMany(db.language);
db.ruleBook.hasMany(db.item);
db.ruleBook.hasMany(db.role);
db.tenant.hasMany(db.access);
db.tenant.hasMany(db.company);
db.tenant.hasMany(db.division);
db.tenant.hasMany(db.profile);
db.tenant.hasMany(db.todo);
db.tenant.hasMany(db.user);
db.user.hasMany(db.todo);

db.access.belongsTo(db.company);
db.access.belongsTo(db.division);
db.access.belongsTo(db.object);
db.access.belongsTo(db.profile);
db.access.belongsTo(db.tenant);
db.access.belongsTo(db.ruleBook);

db.company.belongsTo(db.tenant);
db.company.belongsTo(db.ruleBook);

db.division.belongsTo(db.tenant);
db.division.belongsTo(db.ruleBook);

db.user.belongsTo(db.tenant);
db.user.belongsTo(db.role);
db.user.belongsTo(db.profile);
db.user.belongsTo(db.language);

db.profile.belongsTo(db.tenant);
db.profile.belongsTo(db.ruleBook);

db.language.belongsTo(db.ruleBook);

db.item.belongsTo(db.list);
db.item.belongsTo(db.ruleBook);

db.object.belongsTo(db.ruleBook);

db.role.belongsTo(db.ruleBook);

db.todo.belongsTo(db.tenant);
db.todo.belongsTo(db.user);


module.exports = db;