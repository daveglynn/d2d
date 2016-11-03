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
var extension = require('./extensions/order.extension');
var Sequelize = require('sequelize');
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.addOrder = function(req, res) {

    // pick appropiate fields tenant will be set to default   
    var body = extension.setPost(req, 'C');
               
    db.order.create(body).then(function(order) {
        res.json(order.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.getOrdersAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();
	 			 	
	var include = [{ model: db.orderStatus,attributes: ['id','name']} 		 	
				   ,{model: db.orderType,attributes: ['id','name']}   ]; 	
	
    db.order.findAll({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(orders) {
        res.json(orders);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.getOrderById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	where = common.setClauseTenantId(req, where); 
    var attributes = common.excludeAttributes();
	 			 	
	var include = [{ model: db.orderStatus,attributes: ['id','name']} 		 	
				   ,{model: db.orderType,attributes: ['id','name']}   ]; 	
	
    //find and return the records 
    db.order.findOne({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function(order) {
        if (!!order) {
            res.json(order.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "order", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.updateOrder = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // find record on database, update record and return to client
    db.order.findOne({
        where: where
    }).then(function(order) {
        if (order) {
            order.update(attributes).then(function(order) {
                res.json(order.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "order", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.deleteOrder = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.order.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "order", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};
  	
/******************************************************************************************************
 Get Order records by OrderStatusId 
******************************************************************************************************/
module.exports.getOrdersByOrderStatusId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseOrderStatusId(req, where);
    where = extension.setClauseQueryView(req.query, where);
    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();
	 			 	
	var include = [{ model: db.orderStatus,attributes: ['id','name']} 		 	
				   ,{model: db.orderType,attributes: ['id','name']}   ]; 	
	
    //find and return the records 
    db.order.findAll({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function (orders) {
        res.json(orders);
    }, function (err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Get Order records by OrderTypeId 
******************************************************************************************************/
module.exports.getOrdersByOrderTypeId = function (req, res) {

    // builds clause
    var where = {};
    where = extension.setClauseOrderTypeId(req, where);
    where = extension.setClauseQueryView(req.query, where);
    where = common.setClauseTenantId(req, where);

    var attributes = common.excludeAttributes();
	 			 	
	var include = [{ model: db.orderStatus,attributes: ['id','name']} 		 	
				   ,{model: db.orderType,attributes: ['id','name']}   ]; 	
	
    //find and return the records 
    db.order.findAll({
        attributes: attributes,
        where: where ,
		include: include 	
    }).then(function (orders) {
        res.json(orders);
    }, function (err) {
        res.status(500).json(err);
    });
};

