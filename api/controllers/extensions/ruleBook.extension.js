                      
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
		,'active'
		,'expired'
		,'code'
		,'name'
		,'description'
		,'processflags'
		,'objectId'
	 	);

    //add createdBy
    if (mode == 'C') {
		body.createdBy = common.modelUserId(req);				
		body.tenantId = common.modelTenantId(req); 
	} else {
        body.updatedBy = common.modelUserId(req);
    }
    return body;  
};

module.exports.prepareForUpdate =  function (body) {
        
    var attributes = {};

	if (body.hasOwnProperty('active')) {
		attributes.active = body.active;
	}
	if (body.hasOwnProperty('expired')) {
		attributes.expired = body.expired;
	}
	if (body.hasOwnProperty('code')) {
		attributes.code = body.code;
	}
	if (body.hasOwnProperty('name')) {
		attributes.name = body.name;
	}
	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	}
	if (body.hasOwnProperty('createdBy')) {
		attributes.createdBy = body.createdBy;
	}
	if (body.hasOwnProperty('updatedBy')) {
		attributes.updatedBy = body.updatedBy;
	}
	if (body.hasOwnProperty('processflags')) {
		attributes.processflags = body.processflags;
	}
	if (body.hasOwnProperty('objectId')) {
		attributes.objectId = body.objectId;
	}
	 
    return attributes;
};

module.exports.setClauseQuery =  function (query, where) {	

 	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where = {
		$or: [
  		{code: { $like: '%' + query.q + '%' }}  
		,{name: { $like: '%' + query.q + '%' }}  
		,{description: { $like: '%' + query.q + '%' }}  
		,{processflags: { $like: '%' + query.q + '%' }}  
	 			]
			}
		}

  	if (query.hasOwnProperty('active') && query.active.length > 0) {
			where.active = {
			$eq: query.active
			};
		}
    if (query.hasOwnProperty('expired') && query.expired.length > 0) {
			where.expired = {
			$eq: query.expired
			};
		}
    
  	if (query.hasOwnProperty('objectId') && query.objectId.length > 0) {
			where.objectId = {
			$eq: query.objectId
			};
		}
    	return where;
};
  	
module.exports.setClauseObjectId = function (req, where) {
  
    var objectId = parseInt(req.params.objectId, 10);
    where.objectId = {
         $eq: objectId
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
					|| (req.query.orderBy == 'tenantId')
					|| (req.query.orderBy == 'active')
					|| (req.query.orderBy == 'expired')
					|| (req.query.orderBy == 'code')
					|| (req.query.orderBy == 'name')
					|| (req.query.orderBy == 'description')
					|| (req.query.orderBy == 'createdBy')
					|| (req.query.orderBy == 'createdDate')
					|| (req.query.orderBy == 'updatedBy')
					|| (req.query.orderBy == 'updatedDate')
					|| (req.query.orderBy == 'processflags')
					|| (req.query.orderBy == 'objectId')
		 
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


 