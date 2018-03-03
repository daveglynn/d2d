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
var extension = require('./extensions/item.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addItem = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.item.create(body).then(function(item) {
        res.json(item.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getItemsAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} 									   
				   ,{model: db.list,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    db.item.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(items) {
        res.json(items);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getItemById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} 					
				   ,{model: db.list,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.item.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(item) {
        if (!!item) {
            res.json(item.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "item", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateItem = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.item.findOne({
        where: where
    }).then(function(item) {
        if (item) {
            item.update(attributes).then(function(item) {
                res.json(item.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "item", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteItem = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.item.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "item", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Item records by RuleBookId 
******************************************************************************************************/
module.exports.getItemsByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} 					
				   ,{model: db.list,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.item.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (items) {
        res.json(items);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Item records by ParentListId 
******************************************************************************************************/
module.exports.getItemsByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} 					
				   ,{model: db.list,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.item.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (items) {
        res.json(items);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Item records by ListId 
******************************************************************************************************/
module.exports.getItemsByListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} 					
				   ,{model: db.list,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]}   ]; 	
	
    //find and return the records 
    db.item.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (items) {
        res.json(items);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getItemsDropdown = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	where = common.setClauseTenantId(req, where); 
	where = extension.setClauseListId(req, where);
	 
    var order = extension.setClauseOrder(req); 	
	
	//find and return the records 
    db.item.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order]
    }).then(function (items) {
        if (!!items) {
            res.json(items);
        } else {
            res.status(404).json({ "err": { "name": "item", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record for Dropdown By Id
******************************************************************************************************/
module.exports.getItemsDropdownById = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	where = common.setClauseTenantId(req, where); 
	where = extension.setClauseListId(req, where);
	 
    var order = extension.setClauseOrder(req); 	
    var include = [{ model: db.ruleBook, attributes: ['id', 'active', 'name', 'processflags']}]; 	
	
	//find and return the records 
    db.item.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order],
        include: include 
    }).then(function (items) {
        if (!!items) {
            res.json(items);
        } else {
            res.status(404).json({ "err": { "name": "item", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};	
 


/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getListByIdItems = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    var include = [{
        model: db.item, attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId']
    }];


    //find and return the records 
    db.list.findOne({
        attributes: ['id', 'name'],
        where: where,
        include: include
    }).then(function (list) {
        if (!!list) {
            res.json(list.toPublicJSON());
        } else {
            res.status(404).json({ "err": { "name": "list", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};