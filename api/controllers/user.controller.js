/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/user.extension');

/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.usersPost = function(req, res) {

    // pick appropiate fields and set tenant
    var body = extension.setPost(req, 'C');

    db.user.create(body).then(function(user) {
        res.json(user.toPublicJSON())
    }, function(e) {
        res.status(400).json(e);
    });
};

/******************************************************************************************************
 Login 
******************************************************************************************************/
module.exports.usersLogin = function(req, res) {
    var body = _.pick(req.body, 'email', 'password');
    var userInstance;

    db.user.authenticate(body).then(function(user) {
        var token = user.generateToken('authentication');
        userInstance = user;
        return db.token.create({
            token: token
        });

    }).then(function(tokenInstance) {
        res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
    }).catch(function() {
        res.status(401).send();
    });
};

/******************************************************************************************************
 Logout 
******************************************************************************************************/
module.exports.usersLogout = function(req, res) {
    req.token.destroy().then(function() {
        res.status(204).send();
    }).catch(function() {
        res.status(500).send();
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.usersGetAll = function (req, res) {
    
    // builds clause
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
    var attributes = common.setAttributes();
    
    //find and return the records    
    db.user.findAll({
        attributes: attributes,
        where: where
    }).then(function (users) {
        res.json(users);
    }, function (e) {
        res.status(500).send();
    })
};





/******************************************************************************************************
 Get a Record created by Id - Filtered by TenantId
******************************************************************************************************/
module.exports.usersGetById = function (req, res) {
    
    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);
    var attributes = common.setAttributes();
    
    //find and return the records 
    db.user.findOne({
        attributes: attributes,
        where: where
    }).then(function (user) {
        if (!!user) {
            res.json(user.toPublicJSON());
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    })
};


/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.usersPut = function (req, res) {
    
    // pick appropiate fields and set tenant
    var body = extension.setPost(req, 'U');
    
    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);
    
    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);
    
    // find record on database, update record and return to client
    db.user.findOne({
        where: where
    }).then(function (user) {
        if (user) {
            user.update(attributes).then(function (user) {
                res.json(user.toPublicJSON());
            }, function (e) {
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function () {
        res.status(500).send();
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.usersDelete = function (req, res) {
    
    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);
    
    // delete record on database
    db.user.destroy({
        where: where
    }).then(function (rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({
                error: 'No record found with id'
            });
        } else {
            res.status(204).send();
        }
    }, function () {
        res.status(500).send();
    });
};
