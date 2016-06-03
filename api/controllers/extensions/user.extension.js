/******************************************************************************************************
 controller extension
******************************************************************************************************/
"use strict";
var _ = require('underscore');
var common = require('./common.extension');

/******************************************************************************************************
 Fetch a Record
******************************************************************************************************/
 
module.exports = {

    setPost: function (req, mode) {
        
        //clean post
        var body = _.pick(req.body, 'email', 'password', 'firstName', 'lastName', 'phone', 'address', 'tenantId', 'role');
        
        //add tenant
        body.tenantId = null;
        
        //add createdBy
        if (mode = 'C') {
            body.createdBy = null;
        } else {
            body.updatedBy = common.modelUserId(req);
        }
        return body;

    },
    prepareForUpdate: function (body) {
        
        var attributes = {};
        if (body.hasOwnProperty('email')) {
            attributes.email = body.email;
        }
        if (body.hasOwnProperty('firstName')) {
            attributes.firstName = body.firstName;
        }
        if (body.hasOwnProperty('lastName')) {
            attributes.lastName = body.lastName;
        }
        if (body.hasOwnProperty('phone')) {
            attributes.phone = body.phone;
        }
        if (body.hasOwnProperty('address')) {
            attributes.address = body.address;
        }
        if (body.hasOwnProperty('createdBy')) {
            attributes.tenantId = body.createdBy;
        }
        if (body.hasOwnProperty('updatedBy')) {
            attributes.tenantId = body.createdBy;
        }

        return attributes;

    },
    setClauseQuery: function (query, where) {
        
        //set query parameters   
        if (query.hasOwnProperty('q') && query.q.length > 0) {
            where.email = {
                $like: '%' + query.q + '%'
            };
        }
        return where;

    },

    setClauseEmail: function (req) {

        var email =  req.params.email;
        var where = {
        email: email
        };
    return where;
    },

};

