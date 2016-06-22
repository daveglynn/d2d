/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/tenant.extension');


/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.tenantsGetAll = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);

    //find and return the records    
    db.tenant.findAll({
        where: where
    }).then(function(tenants) {
        res.json(tenants);
    }, function(e) {
        res.status(500).json({ title: controller, message: "An error occurred finding records", error: e, function: helpers.getFunctionName("tenantsGetAll") });
    })
};

/******************************************************************************************************
 Get a Record created by Id 
******************************************************************************************************/
module.exports.tenantsGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);

    //find and return the records 
    db.tenant.findOne({
        where: where
    }).then(function(tenant) {
        if (!!tenant) {
            res.json(tenant.toJSON());
        } else {
            res.status(404).json({ title: controller, message: "No record found", error: e, function: helpers.getFunctionName("tenantsGetById") });
        }
    }, function(e) {
        res.status(500).json({ title: controller, message: "An error occurred finding records", error: e, function: helpers.getFunctionName("tenantsGetById") });
    })
};

/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.tenantsPost = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');

    // create record on database, refresh and return local record to client
    db.tenant.create(body).then(function(tenant) {
        res.json(tenant.toJSON())
    }, function(e) {
        res.status(400).json({ title: controller, message: "Error inserting a record", error: e, function: helpers.getFunctionName("tenantsPost") });
    });

};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.tenantsPut = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);

    // find record on database, update record and return to client
    db.tenant.findOne({
        where: where
    }).then(function(tenant) {
        if (tenant) {
            tenant.update(attributes).then(function(tenant) {
                res.json(tenant.toJSON());
            }, function(e) {
                res.status(400).json({ title: controller, message: "Error updating a record", error: e, function: helpers.getFunctionName("tenantsPut") });
            });
        } else {
            res.status(404).send();
        }
    }, function() {
        res.status(500).json({ title: controller, message: "Error updating a record", error: e, function: helpers.getFunctionName("tenantsPut") });
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.tenantsDelete = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);

    // delete record on database
    db.tenant.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ title: controller, message: "No record found to delete", error: e, function: helpers.getFunctionName("tenantsDelete") });

        } else {
            res.status(204).send();
        }
    }, function() {
        res.status(500).json({ title: controller, message: "Error deleting a record", error: e, function: helpers.getFunctionName("tenantsPut") });
    });
};
