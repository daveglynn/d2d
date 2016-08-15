
             
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/
 
/******************************************************************************************************
 middleware
******************************************************************************************************/
"use strict";
var cryptojs = require('crypto-js');
var constants = require('./shared/constant.shared');
var _ = require('underscore');
var Sequelize = require('sequelize');

module.exports = function(db) {

    return {
        requireAuthentication: function(req, res, next) {

            //var token = req.query.Auth || req.get('Auth') ||  '';            
            // get token from header(for Postman testing) or as query parm from app client
            var token = '';
            if (req.query.Auth) {
                var token = req.query.Auth;
            } else if (req.get('Auth')) {
                var token = req.get('Auth');
            }
            else {
                token = '';
            }
            db.token.findOne({
                where: {
                    tokenHash: cryptojs.MD5(token).toString()
                }
            }).then(function(tokenInstance) {
                if (!tokenInstance) {
                    throw new Error();
                }
               
                req.token = tokenInstance;
                return db.user.findByToken(token);
            }).then(function(user) {
                req.user = user;
                next();
            }).catch(function() {
                res.status(401).json({ title: "Authorisation", message: "Authorisation Denied"});
            });
        },
        requireAuthorisation: function(req, res, next) {

            var roleId = req.user.roleId
            var url = req.url

            if (url.includes("tenants") && (roleId !== constants.roleId_Host)) {
                res.status(401).json({ title: "Authorisation", message: "Authorisation Denied"});
            } else
                next();
        }
    };

};
