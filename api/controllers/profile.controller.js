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
var extension = require('./extensions/profile.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addProfile = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.profile.create(body).then(function(profile) {
        res.json(profile.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getProfilesAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    db.profile.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(profiles) {
        res.json(profiles);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getProfileById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} ]; 	
	
    //find and return the records 
    db.profile.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(profile) {
        if (!!profile) {
            res.json(profile.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "profile", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateProfile = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.profile.findOne({
        where: where
    }).then(function(profile) {
        if (profile) {
            profile.update(attributes).then(function(profile) {
                res.json(profile.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "profile", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteProfile = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.profile.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "profile", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Profile records by RuleBookId 
******************************************************************************************************/
module.exports.getProfilesByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} ]; 	
	
    //find and return the records 
    db.profile.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (profiles) {
        res.json(profiles);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Profile records by ParentListId 
******************************************************************************************************/
module.exports.getProfilesByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags'], include: [{model: db.ruleBook, attributes: ['id', 'active','name','processflags']}]} ]; 	
	
    //find and return the records 
    db.profile.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (profiles) {
        res.json(profiles);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getProfilesDropdown = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	where = common.setClauseTenantId(req, where); 

	 
    //find and return the records 
    db.profile.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where
    }).then(function (profiles) {
        if (!!profiles) {
            res.json(profiles);
        } else {
            res.status(404).json({ "err": { "name": "profile", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};	
 

