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
var extension = require('./extensions/ruleBook.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addRuleBook = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.ruleBook.create(body).then(function(ruleBook) {
        res.json(ruleBook.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getRuleBooksAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} ]; 	
	
    db.ruleBook.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(ruleBooks) {
        res.json(ruleBooks);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getRuleBookById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} ]; 	
	
    //find and return the records 
    db.ruleBook.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(ruleBook) {
        if (!!ruleBook) {
            res.json(ruleBook.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "ruleBook", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateRuleBook = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.ruleBook.findOne({
        where: where
    }).then(function(ruleBook) {
        if (ruleBook) {
            ruleBook.update(attributes).then(function(ruleBook) {
                res.json(ruleBook.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "ruleBook", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteRuleBook = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.ruleBook.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "ruleBook", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get RuleBook records by ObjectId 
******************************************************************************************************/
module.exports.getRuleBooksByObjectId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseObjectId(req, where);
	where = common.setClauseActive(req, where);
	 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.object,attributes: ['id', 'active', 'parentListId', 'name', 'code', 'ruleBookId'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} ]; 	
	
    //find and return the records 
    db.ruleBook.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (ruleBooks) {
        res.json(ruleBooks);
    }, function (err) {
        res.status(500).json(err);
    });
};

 

