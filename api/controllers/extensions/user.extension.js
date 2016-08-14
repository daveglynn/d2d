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
        var body = _.pick(req.body, 'email', 'password', 'firstName', 'lastName', 'roleId','profileId', 'languageId',  'phone', 
        'addressLine1', 'addressLine2','addressLine3','addressLine4' );
        
        //add tenant
        // this defaults to 1- demo 
        // body.tenantId = null;
        
        //add createdBy
        if (mode == 'C') {
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
        if (body.hasOwnProperty('active')) {
            attributes.active = body.active;
        }        
        if (body.hasOwnProperty('firstName')) {
            attributes.firstName = body.firstName;
        }
        if (body.hasOwnProperty('lastName')) {
            attributes.lastName = body.lastName;
        }
        if (body.hasOwnProperty('roleId')) {
            attributes.roleId = body.roleId;
        } 
        if (body.hasOwnProperty('profileId')) {
            attributes.profileId = body.profileId;
        } 
        if (body.hasOwnProperty('languageId')) {
            attributes.languageId = body.languageId;
        }                  
        if (body.hasOwnProperty('phone')) {
            attributes.phone = body.phone;
        }
        if (body.hasOwnProperty('addressLine1')) {
            attributes.addressLine1 = body.addressLine1;
        }
        if (body.hasOwnProperty('addressLine2')) {
            attributes.addressLine2 = body.addressLine2;
        }
        if (body.hasOwnProperty('addressLine3')) {
            attributes.addressLine3 = body.addressLine3;
        }
        if (body.hasOwnProperty('addressLine4')) {
            attributes.addressLine4 = body.addressLine4;
        }
        if (body.hasOwnProperty('createdBy')) {
            attributes.createdBy = body.createdBy;
        }
        if (body.hasOwnProperty('updatedBy')) {
            attributes.updatedBy = body.updatedBy;
        }

        return attributes;

    },
    setClauseQuery: function (query, where) {
        
        //set query parameters   
        if (query.hasOwnProperty('q') && query.q.length > 0) {
            where = {
                $or: [
                    { email: { $like: '%' + query.q + '%' } },
                    { firstName: { $like: '%' + query.q + '%' } }
                ]
            }
        }
 

        if (query.hasOwnProperty('profileId') && query.profileId.length > 0) {
            where.profileId = {
                $eq: query.profileId 
            };
        }

        if (query.hasOwnProperty('languageId') && query.languageId.length > 0) {
            where.languageId = {
                $eq: query.languageId
            };
        }

        if (query.hasOwnProperty('roleId') && query.roleId.length > 0) {
            where.roleId = {
                $eq: query.roleId
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

