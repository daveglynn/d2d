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
var extension = require('./extensions/access.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addAccess = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.access.create(body).then(function(access) {
        res.json(access.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getAccessAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 									   
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   									   
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   									   
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   									   
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']}   ]; 	
	
    db.access.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(access) {
        res.json(access);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getAccessById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(access) {
        if (!!access) {
            res.json(access.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "access", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateAccess = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.access.findOne({
        where: where
    }).then(function(access) {
        if (access) {
            access.update(attributes).then(function(access) {
                res.json(access.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "access", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteAccess = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.access.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "access", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Access records by ProfileId 
******************************************************************************************************/
module.exports.getAccessByProfileId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseProfileId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (access) {
        res.json(access);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Access records by CompanyId 
******************************************************************************************************/
module.exports.getAccessByCompanyId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseCompanyId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (access) {
        res.json(access);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Access records by DivisionId 
******************************************************************************************************/
module.exports.getAccessByDivisionId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseDivisionId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (access) {
        res.json(access);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Access records by ObjectId 
******************************************************************************************************/
module.exports.getAccessByObjectId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseObjectId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (access) {
        res.json(access);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Access records by RuleBookId 
******************************************************************************************************/
module.exports.getAccessByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (access) {
        res.json(access);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Access records by ParentListId 
******************************************************************************************************/
module.exports.getAccessByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.profile,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} 					
				   ,{model: db.company,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.division,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   					
				   ,{model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.access.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (access) {
        res.json(access);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getAccessDropdown = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	where = common.setClauseTenantId(req, where); 

	 
    //find and return the records 
    db.access.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where
    }).then(function (access) {
        if (!!access) {
            res.json(access);
        } else {
            res.status(404).json({ "err": { "name": "access", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};	
 

