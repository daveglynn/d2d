/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/language.extension');
var Sequelize = require('sequelize');

/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.languagesPost = function(req, res) {

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
module.exports.languagesGetAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
    var attributes = common.setAttributes();

    db.language.findAll({
        attributes: attributes,
        where: where
    }).then(function(languages) {
        res.json(languages);
    }, function(err) {
        res.status(500).json(err);
    })
};


/******************************************************************************************************
 Get a Record created by Id 
******************************************************************************************************/
module.exports.languagesGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    var attributes = common.setAttributes();

    //find and return the records 
    db.language.findOne({
        attributes: attributes,
        where: where
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
module.exports.languagesPut = function(req, res) {

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
             res.status(404).json({"err": {"name": "language", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.languagesDelete = function(req, res) {

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
 EXTRA FUNCTIONS 
******************************************************************************************************/