/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/order.extension');


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
        res.status(500).send();
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
        res.status(500).send();
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
            res.status(404).send();
        }
    }, function(e) {
        res.status(500).send();
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
    }, function(e) {
        res.status(400).json(e);
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
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function() {
        res.status(500).send();
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
            res.status(404).json({
                error: 'No record found with id'
            });
        } else {
            res.status(204).send();
        }
    }, function() {
        res.status(500).send();
    });
};
