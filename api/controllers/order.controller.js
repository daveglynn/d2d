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
var controller = "order";

/******************************************************************************************************
 Get All Records - Filtered by TenantId
******************************************************************************************************/
module.exports.ordersGetAll = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
    where = common.setClauseTenantId(req, where);
    var attributes = common.setAttributes();

    //find and return the records    
    db.order.findAll({
        attributes: attributes,
        where: where
    }).then(function(orders) {
        res.json(orders);
    }, function(e) {
        res.status(500).json({ title: controller, message: "An error occurred finding records", error: e, function: helpers.getFunctionName("ordersGetAll") });
    })
};

/******************************************************************************************************
 Get All Records created by UserId - Filtered by TenantId
******************************************************************************************************/
module.exports.ordersGetByUserId = function (req, res) {
    
    // builds clause
    var where = {};
    where = extension.setClauseCreatedBy(req, where);
    where = extension.setClauseQuery(req.query, where);
    where = common.setClauseTenantId(req, where);
    var attributes = common.setAttributes();
    
    //find and return the records  
    db.order.findAll({
        attributes: attributes,
        where: where
    }).then(function (orders) {
        res.json(orders);
    }, function (e) {
         res.status(500).json({ title: errorTitle, message: "An error occurred finding records", error: e, function: helpers.getFunctionName("ordersGetByUserId") });
    })
};
/******************************************************************************************************
 Get a Record created by Id - Filtered by TenantId
******************************************************************************************************/
module.exports.ordersGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);
    var attributes = common.setAttributes();

    //find and return the records 
    db.order.findOne({
        attributes: attributes,
        where: where
    }).then(function(order) {
        if (!!order) {
            res.json(order.toPublicJSON());
        } else {
             res.status(404).json({ title: controller, message: "No record found", function: helpers.getFunctionName("ordersGetById") });

        }
    }, function(e) {
        res.status(500).json({ title: controller, message: "Error finding a record", error: e, function: "ordersGetById" });
    })
};

/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.ordersPost = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');

    // create record on database, refresh and return local record to client
    db.order.create(body).then(function(order) {
        res.json(order.toPublicJSON())
    }, function (e) {
        //res.status(400).json(e);
        res.status(400).json({ title: controller, message: "Error inserting a record", error: e, function: helpers.getFunctionName("ordersPost") });
    });

};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.ordersPut = function(req, res) {

    // pick appropiate fields and set tenant
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
            }, function(e) {
                res.status(400).json({ title: controller, message: "Error updating a record", error: e, function: helpers.getFunctionName("ordersPut") });
            });
        } else {
            res.status(404).json({ title: controller, message: "Error updating a record", function: helpers.getFunctionName("ordersPut") });
        }
    }, function() {
        res.status(500).json({ title: controller, message: "Error updating a record", error: e, function: helpers.getFunctionName("ordersPut") });
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.ordersDelete = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.order.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ title: controller, message: "No record found to delete",  function: helpers.getFunctionName("ordersDelete") });
        } else {
            res.status(204).send();
        }
    }, function() {
        res.status(500).json({ title: controller, message: "An error occurred deleting the record", function: helpers.getFunctionName("ordersDelete") });
    });
};
