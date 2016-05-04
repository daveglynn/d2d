/******************************************************************************************************
 controller extension
******************************************************************************************************/
"use strict";
var _ = require('underscore');
var common = require('../../business/common.business');

module.exports = {
    
    setPost: function (req,mode) {
        
        //clean post
        var body = _.pick(req.body, 'orderStatusId', 'orderTypeId', 'deleted', 'description', 'dateOrdered', 'dateCompleted', 'createdBy', 'updatedBy');
        
        //add tenant
        body.tenantId = common.modelTenantId(req);
        
        //add createdBy,updatedBy
        if (mode = 'C') {
            body.createdBy = common.modelUserId(req);
        } else {
            body.updatedBy = common.modelUserId(req);
        }
        return body;

    },

    prepareForUpdate: function (body) {
        
        var attributes = {};
		  if (body.hasOwnProperty('orderStatusId')) {
				attributes.orderStatusId = body.orderStatusId;
			}
			if (body.hasOwnProperty('orderTypeId')) {
				attributes.orderTypeId = body.orderTypeId;
			}
			if (body.hasOwnProperty('deleted')) {
				attributes.deleted = body.deleted;
			}
			if (body.hasOwnProperty('description')) {
				attributes.description = body.description;
			}
			if (body.hasOwnProperty('dateOrdered')) {
				attributes.dateOrdered = body.dateOrdered;
			}
			if (body.hasOwnProperty('dateCompleted')) {
				attributes.dateCompleted = body.dateCompleted;
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
        if (query.hasOwnProperty('completed') && query.completed === 'true') {
            where.completed = true;
        } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
            where.completed = false;
        }
        if (query.hasOwnProperty('q') && query.q.length > 0) {
            where.description = {
                $like: '%' + query.q + '%'
            };
        }
        return where;

    }


};

