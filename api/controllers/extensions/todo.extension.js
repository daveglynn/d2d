                      
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
var constants = require('../../../shared/constant.shared');

/******************************************************************************************************
 functions
******************************************************************************************************/
module.exports.setPost = function (req, mode) {
 
    //clean post
    var body = _.pick(req.body
		,'userId'
		,'description'
		,'completed'
	 	);

	body.tenantId = common.modelTenantId(req);	
	
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

	if (body.hasOwnProperty('userId')) {
		attributes.userId = body.userId;
	}
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

  	if (query.hasOwnProperty('completed') && query.completed.length > 0) {
			where.completed = {
			$eq: query.completed
			};
		}
    
  	if (query.hasOwnProperty('userId') && query.userId.length > 0) {
			where.userId = {
			$eq: query.userId
			};
		}
    	return where;
};
  	
module.exports.setClauseUserId = function (req, where) {
  
    var userId = parseInt(req.params.userId, 10);
    where.userId = {
         $eq: userId
    };

	return where;
};
	

module.exports.setClauseOrder = function (req) {
 
	// for multi columns
    // order = ["col1", "DESC"],
    //		   ["col2", "ASC"]

    var order = [];
    var orderDir = "ASC"
    var orderBy = "id"

    if (req.query.hasOwnProperty('orderBy') && orderBy.length > 0) {
        if ((req.body.hasOwnProperty(req.query.orderBy)) 
					|| (req.query.orderBy == 'id')
					|| (req.query.orderBy == 'userId')
					|| (req.query.orderBy == 'description')
					|| (req.query.orderBy == 'completed')
					|| (req.query.orderBy == 'createdBy')
					|| (req.query.orderBy == 'updatedBy')
					|| (req.query.orderBy == 'createdAt')
					|| (req.query.orderBy == 'updatedAt')
					|| (req.query.orderBy == 'tenantId')
		 
		){

            orderBy = req.query.orderBy

            if (req.query.hasOwnProperty('orderDir') && orderDir.length > 0) {
                if ((req.body.hasOwnProperty(req.query.orderDir)) ||
                    (req.query.orderDir == 'ASC') ||
                    (req.query.orderDir == 'DESC')) {
                      orderDir = req.query.orderDir
                }
            }
        }
    }

    order = [orderBy, orderDir]

    return order;

};


 