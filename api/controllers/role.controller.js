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
var extension = require('./extensions/role.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addRole = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');
               
    db.role.create(body).then(function(role) {
        res.json(role.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getRolesAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    db.role.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(roles) {
        res.json(roles);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getRoleById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    //find and return the records 
    db.role.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(role) {
        if (!!role) {
            res.json(role.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "role", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateRole = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // find record on database, update record and return to client
    db.role.findOne({
        where: where
    }).then(function(role) {
        if (role) {
            role.update(attributes).then(function(role) {
                res.json(role.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "role", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteRole = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // delete record on database
    db.role.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "role", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Role records by RuleBookId 
******************************************************************************************************/
module.exports.getRolesByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    //find and return the records 
    db.role.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (roles) {
        res.json(roles);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Role records by ParentListId 
******************************************************************************************************/
module.exports.getRolesByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    //find and return the records 
    db.role.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (roles) {
        res.json(roles);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getRolesDropdown = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	 
	 
    var order = extension.setClauseOrder(req); 	
	
	//find and return the records 
    db.role.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order]
    }).then(function (roles) {
        if (!!roles) {
            res.json(roles);
        } else {
            res.status(404).json({ "err": { "name": "role", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record for Dropdown By Id
******************************************************************************************************/
module.exports.getRolesDropdownById = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	 
	 
    var order = extension.setClauseOrder(req); 	
    var include = [{ model: db.ruleBook, attributes: ['id', 'active', 'name', 'processflags']}]; 	
	
	//find and return the records 
    db.role.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order],
        include: include 
    }).then(function (roles) {
        if (!!roles) {
            res.json(roles);
        } else {
            res.status(404).json({ "err": { "name": "role", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};	
 

