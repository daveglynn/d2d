                    
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
				,'description'
				,'completed'
				,'userId'
		 		);

        //add createdBy
        if (mode == 'C') {
		 body.createdBy = common.modelUserId(req);		
		} else {
            body.updatedBy = common.modelUserId(req);
        }
        return body;  

    },
    prepareForUpdate: function (body) {
        
        var attributes = {};

		if (body.hasOwnProperty('description')) {
			attributes.description = body.description;
		}
		if (body.hasOwnProperty('completed')) {
			attributes.completed = body.completed;
		}
		if (body.hasOwnProperty('createdBy')) {
			attributes.createdBy = body.createdBy;
		}
		if (body.hasOwnProperty('updatedBy')) {
			attributes.updatedBy = body.updatedBy;
		}
		if (body.hasOwnProperty('userId')) {
			attributes.userId = body.userId;
		}
		 

        return attributes;

    },
    setClauseQuery: function (query, where) {

 		if (query.hasOwnProperty('q') && query.q.length > 0) {
			 where = {
				$or: [
  				{description: { $like: '%' + query.q + '%' }}  
		 			]
				}
			}

  			if (query.hasOwnProperty('userId') && query.userId.length > 0) {
				where.userId = {
				$eq: query.userId
				};
			}
        
        return where;

    },

};

 