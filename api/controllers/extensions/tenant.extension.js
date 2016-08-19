                    
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
				,'name'
				,'active'
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

		if (body.hasOwnProperty('name')) {
			attributes.name = body.name;
		}
		if (body.hasOwnProperty('active')) {
			attributes.active = body.active;
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
		 			]
				}
			}

  		
        return where;

    },

};

 