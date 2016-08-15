                        
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/
 
/******************************************************************************************************
 controller extension
******************************************************************************************************/
"use strict";
var _ = require('underscore');
var common = require('./common.extension');

/******************************************************************************************************
 functions
******************************************************************************************************/
module.exports = {

    setPost: function (req, mode) {
        
        //clean post
        var body = _.pick(req.body
				,'listId'
				,'active'
				,'name'
				,'code'
				,'ruleBookId'
				,'expired'
				,'parent'
				,'parentListId'
		 		);

        //add createdBy
        if (mode == 'C') {
		 body.createdBy = common.modelUserId(req);		
		} else {
            body.updatedBy = common.modelItemId(req);
        }
        return body;  

    },
    prepareForUpdate: function (body) {
        
        var attributes = {};

		if (body.hasOwnProperty('listId')) {
			attributes.listId = body.listId;
		}
		if (body.hasOwnProperty('active')) {
			attributes.active = body.active;
		}
		if (body.hasOwnProperty('name')) {
			attributes.name = body.name;
		}
		if (body.hasOwnProperty('code')) {
			attributes.code = body.code;
		}
		if (body.hasOwnProperty('ruleBookId')) {
			attributes.ruleBookId = body.ruleBookId;
		}
		if (body.hasOwnProperty('expired')) {
			attributes.expired = body.expired;
		}
		if (body.hasOwnProperty('parent')) {
			attributes.parent = body.parent;
		}
		if (body.hasOwnProperty('parentListId')) {
			attributes.parentListId = body.parentListId;
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

 		if (query.hasOwnProperty('q') && query.q.length > 0) {
			 where = {
				$or: [
  				{name: { $like: '%' + query.q + '%' }}  
				,{code: { $like: '%' + query.q + '%' }}  
				,{ruleBookId: { $like: '%' + query.q + '%' }}  
		 			]
				}
			}

  			if (query.hasOwnProperty('listId') && query.listId.length > 0) {
				where.listId = {
				$eq: query.listId
				};
			}
        	if (query.hasOwnProperty('ruleBookId') && query.ruleBookId.length > 0) {
				where.ruleBookId = {
				$eq: query.ruleBookId
				};
			}
        	if (query.hasOwnProperty('parentListId') && query.parentListId.length > 0) {
				where.parentListId = {
				$eq: query.parentListId
				};
			}
        
        return where;

    },

};


