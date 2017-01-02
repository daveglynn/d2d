                      
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
		,'languageId'
		,'roleId'
		,'profileId'
		,'active'
		,'email'
		,'firstName'
		,'lastName'
		,'phone'
		,'addressLine1'
		,'addressLine2'
		,'addressLine3'
		,'addressLine4'
		,'enabledFrom'
		,'enabledTo'
	 		,'password'	);

    //add createdBy
    if (mode == 'C') {
		body.createdBy = null;
  		if (body.languageId == null) {
			body.languageId = constants.languageId_Default.toString();
		}
    	if (body.roleId == null) {
			body.roleId = constants.roleId_Default.toString();
		}
    	if (body.profileId == null) {
			body.profileId = constants.profileId_Default.toString();
		}
    			
	} else {
        body.updatedBy = common.modelUserId(req);
    }
    return body;  
};

module.exports.prepareForUpdate =  function (body) {
        
    var attributes = {};

	if (body.hasOwnProperty('languageId')) {
		attributes.languageId = body.languageId;
	}
	if (body.hasOwnProperty('roleId')) {
		attributes.roleId = body.roleId;
	}
	if (body.hasOwnProperty('profileId')) {
		attributes.profileId = body.profileId;
	}
	if (body.hasOwnProperty('active')) {
		attributes.active = body.active;
	}
	if (body.hasOwnProperty('email')) {
		attributes.email = body.email;
	}
	if (body.hasOwnProperty('firstName')) {
		attributes.firstName = body.firstName;
	}
	if (body.hasOwnProperty('lastName')) {
		attributes.lastName = body.lastName;
	}
	if (body.hasOwnProperty('phone')) {
		attributes.phone = body.phone;
	}
	if (body.hasOwnProperty('addressLine1')) {
		attributes.addressLine1 = body.addressLine1;
	}
	if (body.hasOwnProperty('addressLine2')) {
		attributes.addressLine2 = body.addressLine2;
	}
	if (body.hasOwnProperty('addressLine3')) {
		attributes.addressLine3 = body.addressLine3;
	}
	if (body.hasOwnProperty('addressLine4')) {
		attributes.addressLine4 = body.addressLine4;
	}
	if (body.hasOwnProperty('createdBy')) {
		attributes.createdBy = body.createdBy;
	}
	if (body.hasOwnProperty('updatedBy')) {
		attributes.updatedBy = body.updatedBy;
	}
	if (body.hasOwnProperty('enabledFrom')) {
		attributes.enabledFrom = body.enabledFrom;
	}
	if (body.hasOwnProperty('enabledTo')) {
		attributes.enabledTo = body.enabledTo;
	}
	 
    return attributes;
};

module.exports.setClauseQuery =  function (query, where) {	

 	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where = {
		$or: [
  		{email: { $like: '%' + query.q + '%' }}  
		,{firstName: { $like: '%' + query.q + '%' }}  
		,{lastName: { $like: '%' + query.q + '%' }}  
		,{phone: { $like: '%' + query.q + '%' }}  
		,{addressLine1: { $like: '%' + query.q + '%' }}  
		,{addressLine2: { $like: '%' + query.q + '%' }}  
		,{addressLine3: { $like: '%' + query.q + '%' }}  
		,{addressLine4: { $like: '%' + query.q + '%' }}  
	 			]
			}
		}

  	if (query.hasOwnProperty('active') && query.active.length > 0) {
			where.active = {
			$eq: query.active
			};
		}
    
  	if (query.hasOwnProperty('languageId') && query.languageId.length > 0) {
			where.languageId = {
			$eq: query.languageId
			};
		}
    if (query.hasOwnProperty('roleId') && query.roleId.length > 0) {
			where.roleId = {
			$eq: query.roleId
			};
		}
    if (query.hasOwnProperty('profileId') && query.profileId.length > 0) {
			where.profileId = {
			$eq: query.profileId
			};
		}
    	return where;
};
  	
module.exports.setClauseLanguageId = function (req, where) {
  
    var languageId = parseInt(req.params.languageId, 10);
    where.languageId = {
         $eq: languageId
    };

	return where;
};
	
module.exports.setClauseRoleId = function (req, where) {
  
    var roleId = parseInt(req.params.roleId, 10);
    where.roleId = {
         $eq: roleId
    };

	return where;
};
	
module.exports.setClauseProfileId = function (req, where) {
  
    var profileId = parseInt(req.params.profileId, 10);
    where.profileId = {
         $eq: profileId
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
					|| (req.query.orderBy == 'languageId')
					|| (req.query.orderBy == 'roleId')
					|| (req.query.orderBy == 'profileId')
					|| (req.query.orderBy == 'active')
					|| (req.query.orderBy == 'email')
					|| (req.query.orderBy == 'firstName')
					|| (req.query.orderBy == 'lastName')
					|| (req.query.orderBy == 'phone')
					|| (req.query.orderBy == 'addressLine1')
					|| (req.query.orderBy == 'addressLine2')
					|| (req.query.orderBy == 'addressLine3')
					|| (req.query.orderBy == 'addressLine4')
					|| (req.query.orderBy == 'salt')
					|| (req.query.orderBy == 'password_hash')
					|| (req.query.orderBy == 'createdBy')
					|| (req.query.orderBy == 'updatedBy')
					|| (req.query.orderBy == 'createdAt')
					|| (req.query.orderBy == 'updatedAt')
					|| (req.query.orderBy == 'enabledFrom')
					|| (req.query.orderBy == 'enabledTo')
		 
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


 