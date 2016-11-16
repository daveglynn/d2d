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
var extension = require('./extensions/language.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addLanguage = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');
               
    db.language.create(body).then(function(language) {
        res.json(language.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getLanguagesAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 			 	
	var include = [{ model: db.ruleBook,attributes: ['id','name']} ]; 	
	
    db.language.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(languages) {
        res.json(languages);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getLanguageById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	 
    var attributes = common.excludeAttributes();
	 			 	
	var include = [{ model: db.ruleBook,attributes: ['id','name']} ]; 	
	
    //find and return the records 
    db.language.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(language) {
        if (!!language) {
            res.json(language.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "language", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateLanguage = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // find record on database, update record and return to client
    db.language.findOne({
        where: where
    }).then(function(language) {
        if (language) {
            language.update(attributes).then(function(language) {
                res.json(language.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "language", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteLanguage = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // delete record on database
    db.language.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "language", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Language records by RuleBookId 
******************************************************************************************************/
module.exports.getLanguagesByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
    where = extension.setClauseQueryView(req.query, where);
    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 			 	
	var include = [{ model: db.ruleBook,attributes: ['id','name']} ]; 	
	
    //find and return the records 
    db.language.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (languages) {
        res.json(languages);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Language records by ParentListId 
******************************************************************************************************/
module.exports.getLanguagesByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
    where = extension.setClauseQueryView(req.query, where);
    

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 			 	
	var include = [{ model: db.ruleBook,attributes: ['id','name']} ]; 	
	
    //find and return the records 
    db.language.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (languages) {
        res.json(languages);
    }, function (err) {
        res.status(500).json(err);
    });
};


/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getLanguagesDropdown = function (req, res) {

    // builds clause
    var where = {};

    //find and return the records 
    db.language.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where
    }).then(function (languages) {
        if (!!languages) {
            res.json(languages);
        } else {
            res.status(404).json({ "err": { "name": "language", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};