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
var extension = require('./extensions/list.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addList = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');
               
    db.list.create(body).then(function(list) {
        res.json(list.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getListsAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseActive(req, where);
	 
	 
    var attributes = common.excludeAttributes();

    var order = extension.setClauseOrder(req); 	

	 		
    db.list.findAll({
        attributes: attributes,
        where: where ,
		order: [order]	
    }).then(function(lists) {
        res.json(lists);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getListById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseActive(req, where);
	 
	 
    var attributes = common.excludeAttributes();

	 		
    //find and return the records 
    db.list.findOne({
        attributes: attributes,
        where: where 	
    }).then(function(list) {
        if (!!list) {
            res.json(list.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "list", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateList = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // find record on database, update record and return to client
    db.list.findOne({
        where: where
    }).then(function(list) {
        if (list) {
            list.update(attributes).then(function(list) {
                res.json(list.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "list", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteList = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    

    // delete record on database
    db.list.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "list", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
 

