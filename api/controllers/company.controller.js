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
var extension = require('./extensions/company.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addCompany = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.company.create(body).then(function(company) {
        res.json(company.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getCompaniesAll = function(req, res) {

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
	
    db.company.findAll({
        attributes: attributes,
        where: where ,
		order: [order],
		include: include 	
    }).then(function(companies) {
        res.json(companies);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getCompanyById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    //find and return the records 
    db.company.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(company) {
        if (!!company) {
            res.json(company.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "company", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateCompany = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.company.findOne({
        where: where
    }).then(function(company) {
        if (company) {
            company.update(attributes).then(function(company) {
                res.json(company.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "company", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteCompany = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.company.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "company", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Company records by RuleBookId 
******************************************************************************************************/
module.exports.getCompaniesByRuleBookId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseRuleBookId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    //find and return the records 
    db.company.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (companies) {
        res.json(companies);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Company records by ParentListId 
******************************************************************************************************/
module.exports.getCompaniesByParentListId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseParentListId(req, where);
	where = common.setClauseActive(req, where);
	where = common.setClauseExpired(req.query, where); 

    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();

	var order = extension.setClauseOrder(req); 	

	 						
	var include = [{ model: db.ruleBook,attributes: ['id', 'active', 'name', 'processflags']} ]; 	
	
    //find and return the records 
    db.company.findAll({
        attributes: attributes,
        where: where,
		order: [order],
		include: include 	
    }).then(function (companies) {
        res.json(companies);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get a Record for Dropdown
******************************************************************************************************/
module.exports.getCompaniesDropdown = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	where = common.setClauseTenantId(req, where); 
	 
    var order = extension.setClauseOrder(req); 	
	
	//find and return the records 
    db.company.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order]
    }).then(function (companies) {
        if (!!companies) {
            res.json(companies);
        } else {
            res.status(404).json({ "err": { "name": "company", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record for Dropdown By Id
******************************************************************************************************/
module.exports.getCompaniesDropdownById = function (req, res) {

    // builds clause
    var where = {};
    where = common.setClauseActive(req, where);
    where = common.setClauseExpired(req.query, where);
	where = common.setClauseTenantId(req, where); 
	 
    var order = extension.setClauseOrder(req); 	
    var include = [{ model: db.ruleBook, attributes: ['id', 'active', 'name', 'processflags']}]; 	
	
	//find and return the records 
    db.company.findAll({
        attributes: ['id', 'parentListId', 'name', 'code', 'ruleBookId'],
        where: where,
        order: [order],
        include: include 
    }).then(function (companies) {
        if (!!companies) {
            res.json(companies);
        } else {
            res.status(404).json({ "err": { "name": "company", "message": "An error occurred retrieving the record" } });
        }
    }, function (err) {
        res.status(500).json(err);
    })
};	
 

