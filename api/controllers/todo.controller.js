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
var extension = require('./extensions/todo.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addTodo = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.todo.create(body).then(function(todo) {
        res.json(todo.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getTodosAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();
	 			
	var include = [{ model: db.user,attributes: ['name']} ]; 	
	
    db.todo.findAll({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(todos) {
        res.json(todos);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getTodoById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();
	 			
	var include = [{ model: db.user,attributes: ['name']} ]; 	
	
    //find and return the records 
    db.todo.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(todo) {
        if (!!todo) {
            res.json(todo.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "todo", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateTodo = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.todo.findOne({
        where: where
    }).then(function(todo) {
        if (todo) {
            todo.update(attributes).then(function(todo) {
                res.json(todo.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "todo", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteTodo = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.todo.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "todo", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Todo records by UserId 
******************************************************************************************************/
module.exports.getTodosByUserId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseUserId(req, where);
    where = extension.setClauseQueryView(req.query, where);
    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();
	 			
	var include = [{ model: db.user,attributes: ['name']} ]; 	
	
    //find and return the records 
    db.todo.findAll({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function (todos) {
        res.json(todos);
    }, function (err) {
        res.status(500).json(err);
    });
};

