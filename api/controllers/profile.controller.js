/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/profile.extension');
var Sequelize = require('sequelize');

/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.profilesPost = function(req, res) {

    // pick appropiate fields and set tenant
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
module.exports.profilesGetAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = common.setClauseTenantId(req, where);
    where = extension.setClauseQuery(req.query, where);
    var attributes = common.setAttributes();

    db.profile.findAll({
        attributes: attributes,
        where: where
    }).then(function(profiles) {
        res.json(profiles);
    }, function(err) {
        res.status(500).json(err);
    })
};


/******************************************************************************************************
 Get a Record created by Id - Filtered by TenantId
******************************************************************************************************/
module.exports.profilesGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);
    var attributes = common.setAttributes();

    //find and return the records 
    db.profile.findOne({
        attributes: attributes,
        where: where
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
module.exports.profilesPut = function(req, res) {

    // pick appropiate fields and set tenant
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
             res.status(404).json({"err": {"name": "profile", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.profilesDelete = function(req, res) {

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
 EXTRA FUNCTIONS 
******************************************************************************************************/
