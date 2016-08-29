                      
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
module.exports.setPost = function (req, mode) {
 
    //clean post
    var body = _.pick(req.body
		,'orderStatusId'
		,'orderTypeId'
		,'deleted'
		,'description'
		,'dateOrdered'
		,'dateCompleted'
	 	);

    //add createdBy
    if (mode == 'C') {
	 body.createdBy = common.modelUserId(req);		
	} else {
        body.updatedBy = common.modelUserId(req);
    }
    return body;  
};

module.exports.prepareForUpdate =  function (body) {
        
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
};

module.exports.setClauseQuery =  function (query, where) {	

 	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where = {
		$or: [
  		{description: { $like: '%' + query.q + '%' }}  
	 			]
			}
		}

  	if (query.hasOwnProperty('deleted') && query.deleted.length > 0) {
			where.deleted = {
			$eq: query.deleted
			};
		}
    
  	if (query.hasOwnProperty('orderStatusId') && query.orderStatusId.length > 0) {
			where.orderStatusId = {
			$eq: query.orderStatusId
			};
		}
    if (query.hasOwnProperty('orderTypeId') && query.orderTypeId.length > 0) {
			where.orderTypeId = {
			$eq: query.orderTypeId
			};
		}
    	return where;
};
  	
module.exports.setClauseOrderStatusId = function (req, where) {
  
    var orderStatusId = parseInt(req.params.orderStatusId, 10);
    where = {
        orderStatusId: orderStatusId
    };
	return where;
};
	
module.exports.setClauseOrderTypeId = function (req, where) {
  
    var orderTypeId = parseInt(req.params.orderTypeId, 10);
    where = {
        orderTypeId: orderTypeId
    };
	return where;
};
	


 