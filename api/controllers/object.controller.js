                      /******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var helpers = require('../.././shared/helpers.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/object.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addObject = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');
               
    db.object.create(body).then(function(object) {
        res.json(object.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getObjectsAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.objectType,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 									   
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   									   
				   ,{model: db.role,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    db.object.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(objects) {
        res.json(objects);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getObjectById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.objectType,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   					
				   ,{model: db.role,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.object.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(object) {
        if (!!object) {
            res.json(object.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "object", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateObject = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // find record on database, update record and return to client
    db.object.findOne({
        where: where
    }).then(function(object) {
        if (object) {
            object.update(attributes).then(function(object) {
                res.json(object.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "object", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteObject = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // delete record on database
    db.object.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "object", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Object records by ObjectTypeId 
******************************************************************************************************/
module.exports.getObjectsByObjectTypeId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseObjectTypeId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.objectType,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   					
				   ,{model: db.role,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.object.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (objects) {
        res.json(objects);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Object records by RuleBookId 
******************************************************************************************************/
module.exports.getObjectsByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.objectType,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   					
				   ,{model: db.role,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.object.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (objects) {
        res.json(objects);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Object records by ParentListId 
******************************************************************************************************/
module.exports.getObjectsByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.objectType,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   					
				   ,{model: db.role,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.object.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (objects) {
        res.json(objects);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Object records by RoleId 
******************************************************************************************************/
module.exports.getObjectsByRoleId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRoleId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.objectType,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   					
				   ,{model: db.role,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.object.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (objects) {
        res.json(objects);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getObjectsDropdown = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	 
	 
    var order = extension.setClauseOrder(req); 	
	
	//find and return the records 
    db.object.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order]
    }).then(function (objects) {
        if (!!objects) {
            res.json(objects);
        } else {
            res.status(404).json({ "err": { "name": "object", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record for Dropdown By Id
******************************************************************************************************/
module.exports.getObjectsDropdownById = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	 
	 
    var order = extension.setClauseOrder(req); 	
    var include = [{ model: db.ruleBook, attributes: ['id', 'active', 'name', 'processflags']}]; 	
	
	//find and return the records 
    db.object.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order],
        include: include 
    }).then(function (objects) {
        if (!!objects) {
            res.json(objects);
        } else {
            res.status(404).json({ "err": { "name": "object", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};	
 

