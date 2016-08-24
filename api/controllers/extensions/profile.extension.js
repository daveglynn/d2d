                      
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
		,'name'
		,'active'
		,'description'
		,'hideElements'
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
	if (body.hasOwnProperty('active')) {
		attributes.active = body.active;
	}
	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
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
};

module.exports.setClauseQuery =  function (query, where) {	

 	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where = {
		$or: [
  		{name: { $like: '%' + query.q + '%' }}  
		,{description: { $like: '%' + query.q + '%' }}  
		,{hideElements: { $like: '%' + query.q + '%' }}  
	 			]
			}
		}

  	if (query.hasOwnProperty('active') && query.active.length > 0) {
			where.active = {
			$eq: query.active
			};
		}
    
  	
  		return where;
};

 