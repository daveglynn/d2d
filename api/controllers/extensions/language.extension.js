                      
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
		,'name'
		,'code'
		,'active'
		,'ruleBookId'
		,'expired'
		,'parent'
		,'parentListId'
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

	if (body.hasOwnProperty('name')) {
		attributes.name = body.name;
	}
	if (body.hasOwnProperty('code')) {
		attributes.code = body.code;
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
	 
    return attributes;
};

module.exports.setClauseQuery =  function (query, where) {	

 	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where = {
		$or: [
  		{name: { $like: '%' + query.q + '%' }}  
		,{code: { $like: '%' + query.q + '%' }}  
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
    if (query.hasOwnProperty('parent') && query.parent.length > 0) {
			where.parent = {
			$eq: query.parent
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
};
  	
module.exports.setClauseRuleBookId = function (req, where) {
  
    var ruleBookId = parseInt(req.params.ruleBookId, 10);
    where = {
        ruleBookId: ruleBookId
    };
	return where;
};
	
module.exports.setClauseParentListId = function (req, where) {
  
    var parentListId = parseInt(req.params.parentListId, 10);
    where = {
        parentListId: parentListId
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
					|| (req.query.orderBy == 'name')
					|| (req.query.orderBy == 'code')
					|| (req.query.orderBy == 'active')
					|| (req.query.orderBy == 'createdBy')
					|| (req.query.orderBy == 'updatedBy')
					|| (req.query.orderBy == 'createdAt')
					|| (req.query.orderBy == 'updatedAt')
					|| (req.query.orderBy == 'ruleBookId')
					|| (req.query.orderBy == 'expired')
					|| (req.query.orderBy == 'parent')
					|| (req.query.orderBy == 'parentListId')
		 
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

module.exports.setClauseActive = function (query, where)
{

    where.active = {
        $eq: true
	};

    if (query.hasOwnProperty('active') && query.active.length > 0)
    {
        if (query.active == "false")
        {
            where.active = {
                $eq: false
            };
        }
        if (query.active == "true") {
            where.active = {
                $eq: true
            };
        }
    }

    return where;

};

module.exports.setClauseExpired = function (query, where)
{

    if (query.hasOwnProperty('expired') && query.expired.length > 0)
    {
        if (query.expired == "false")
        {
            where.expired = {
                $eq: false
            };
        }
        if (query.expired == "true") {
            where.expired = {
                $eq: true
            };
        }
    }

    return where;

};

 

 