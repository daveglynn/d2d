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
        var body = _.pick(req.body, 'name', 'description', 'hideElements','createdBy', 'updatedBy');
        
        //add tenant
        body.tenantId = common.modelTenantId(req);;
        
        //add createdBy
        if (mode == 'C') {
            body.createdBy = common.modelUserId(req);;
        } else {
            body.updatedBy = common.modelUserId(req);
        }
        return body;

    },
    prepareForUpdate: function (body) {
        
        var attributes = {};
        if (body.hasOwnProperty('name')) {
            attributes.name = body.name;
        }
        if (body.hasOwnProperty('description')) {
            attributes.name = body.description;
        }		
        if (body.hasOwnProperty('hideElements')) {
            attributes.hideElements = body.hideElements;
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
            where.name = {
                $like: '%' + query.q + '%'
            };
        }
        return where;

    }

};

