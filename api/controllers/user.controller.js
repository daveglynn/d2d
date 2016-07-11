/******************************************************************************************************
 controller layer
******************************************************************************************************/
"use strict";
var db = require('../.././db.js');
var _ = require('underscore');
var constants = require('../.././shared/constant.shared');
var helpers = require('../.././shared/helpers.shared');
var common = require('./extensions/common.extension');
var extension = require('./extensions/user.extension');
var controller = "user";

/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.usersPost = function(req, res) {

    // pick appropiate fields and set tenant
    var body = extension.setPost(req, 'C');

    db.user.create(body).then(function(user) {
        res.json(user.toPublicJSON())
    }, function (e) {
        res.status(400).json(helpers.setDebugInfo(e, controller, "usersPost", "An error occurred inserting a record"));
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
        // could not read header in angular client so I jused used the response to send back the token
        //res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
        res.status(200).json({
            message: 'Signin Successful',
            token: tokenInstance.get('token'),
            user: userInstance.toPublicJSON()
        })
    }).catch(function() {
        res.status(400).json({ title: controller, message: "Invalid Email/Password combination or incorrect Tenancy / Role", function: helpers.getFunctionName("usersLogin") });
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
module.exports.usersGetAll = function(req, res) {

    // builds clause 
    var where = {};
    //where = common.setClauseAll(req, where);
    //where = extension.setClauseQuery(req.query, where);
    var attributes = common.setAttributes();

    //find and return the records    
    db.user.findAll({
        attributes: attributes,
        where: where
    }).then(function(users) {
        res.json(users);
    }, function(e) {
        res.status(500).json(helpers.setDebugInfo(e, controller, "usersGetAll", "An error occurred finding records"));
    })
};

 
/******************************************************************************************************
 Get a Record created by Id - Filtered by TenantId
******************************************************************************************************/
module.exports.usersGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);
    var attributes = common.setAttributes();

    //find and return the records 
    db.user.findOne({
        attributes: attributes,
        where: where
    }).then(function(user) {
        if (!!user) {
            res.json(user.toPublicJSON());
        } else {
            res.status(404).send();
        }
    }, function(e) {
        res.status(500).json(helpers.setDebugInfo(e, controller, "usersGetById", "Error finding a record"));
    })
};


/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.usersPut = function(req, res) {

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
    }).then(function(user) {
        if (user) {
            user.update(attributes).then(function(user) {
                res.json(user.toPublicJSON());
            }, function(e) {
                res.status(400).send();
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
module.exports.usersDelete = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    where = common.setClauseTenantId(req, where);

    // delete record on database
    db.user.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).send("No User Record found to delete");
        } else {
            res.status(200).send();
        }
    }, function() {
        res.status(500).json(helpers.setDebugInfo(e, controller, "usersDelete", "An error occurred deleting the record"));
    });
};


/******************************************************************************************************
 EXTRA FUNCTIONS 
******************************************************************************************************/

/******************************************************************************************************
 Get a Record by email - Filtered by TenantId
******************************************************************************************************/
module.exports.userCheckExistsEmail = function(req, res) {

    // builds clause
    var where = { email: req.params.email };

    //find and return the records 
    db.user.findOne({
        where: where
    }).then(function(user) {
        if (!!user) {
            res.status(200).send();
        } else {
             res.status(404).send();
        }
    }, function(e) {
        res.status(500).send();
    })
};


