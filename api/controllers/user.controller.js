                    
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
var extension = require('./extensions/user.extension');
var controller = "user";
var Sequelize = require('sequelize');
 
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
        res.status(400).json({"err": {"name": "authorisation", "message": "Signin UnSuccessful"  }}   );
    });
};

/******************************************************************************************************
 Logout 
******************************************************************************************************/
module.exports.usersLogout = function(req, res) {
    req.token.destroy().then(function() {
        res.status(204).send();
    }).catch(function(err) {
        res.status(500).json(err);
    });
};
 
/******************************************************************************************************
 Insert a Record 
******************************************************************************************************/
module.exports.usersPost = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'C');
               
    db.user.create(body).then(function(user) {
        res.json(user.toPublicJSON())
    }).catch(Sequelize.ValidationError, function(err) {
         res.status(422).send(err.errors);
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

/******************************************************************************************************
 Get All Records 
******************************************************************************************************/
module.exports.usersGetAll = function(req, res) {

    // builds clause 
    var where = {};
    where = common.setClauseAll(req, where);
    where = extension.setClauseQuery(req.query, where);
	 
    var attributes = common.setAttributes();

    db.user.findAll({
        attributes: attributes,
        where: where
    }).then(function(users) {
        res.json(users);
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Get a Record by Id
******************************************************************************************************/
module.exports.usersGetById = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
	 
    var attributes = common.setAttributes();

    //find and return the records 
    db.user.findOne({
        attributes: attributes,
        where: where
    }).then(function(user) {
        if (!!user) {
            res.json(user.toPublicJSON());
        } else {
            res.status(404).json({"err": {"name": "user", "message": "An error occurred retrieving the record"  }});
        }
    }, function(err) {
        res.status(500).json(err);
    })
};

/******************************************************************************************************
 Update a Record 
******************************************************************************************************/
module.exports.usersPut = function(req, res) {

    // pick appropiate fields 
    var body = extension.setPost(req, 'U');

    // set the attributes to update
    var attributes = extension.prepareForUpdate(body);

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    
    // find record on database, update record and return to client
    db.user.findOne({
        where: where
    }).then(function(user) {
        if (user) {
            user.update(attributes).then(function(user) {
                res.json(user.toPublicJSON());
            }, function(err) {
                res.status(400).json(err);
            });
        } else {
             res.status(404).json({"err": {"name": "user", "message": "An error occurred retrieving the record"}});
        }
    }, function(err) {
        res.status(500).json(err);
    });
};

/******************************************************************************************************
 Delete a Record 
******************************************************************************************************/
module.exports.usersDelete = function(req, res) {

    // builds clause
    var where = {};
    where = common.setClauseId(req, where);
    
    // delete record on database
    db.user.destroy({
        where: where
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({ "err": { "name": "user", "message": "An error occurred retrieving the record"}});
        } else {
            res.status(204).send();
        }
    }, function(err) {
        res.status(500).json(err);
    });
};