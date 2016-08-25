                      
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
var controller = "user";
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.itemPost = function(req, res) {

    // pick appropiate fields 
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
module.exports.itemGetAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	 
    var attributes = common.excludeAttributes();

    db.item.findAll({
        attributes: attributes,
        where: where
    }).then(function(items) {
        res.json(items);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.itemGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	 
    var attributes = common.excludeAttributes();

    //find and return the records 
    db.item.findOne({
        attributes: attributes,
        where: where
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
module.exports.itemPut = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    
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
module.exports.itemDelete = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    
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

