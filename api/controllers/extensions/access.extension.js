                      
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
		,'profileId'
		,'companyId'
		,'divisionId'
		,'objectId'
		,'active'
		,'name'
		,'code'
		,'ruleBookId'
		,'expired'
		,'parent'
		,'parentListId'
		,'description'
		,'canAdd'
		,'canView'
		,'canEdit'
		,'canDelete'
		,'setAllModeElements'
		,'setAddModeElements'
		,'setViewModeElements'
		,'setEditModeElements'
		,'setDeleteModeElements'
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

	if (body.hasOwnProperty('profileId')) {
		attributes.profileId = body.profileId;
	}
	if (body.hasOwnProperty('companyId')) {
		attributes.companyId = body.companyId;
	}
	if (body.hasOwnProperty('divisionId')) {
		attributes.divisionId = body.divisionId;
	}
	if (body.hasOwnProperty('objectId')) {
		attributes.objectId = body.objectId;
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
	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	}
	if (body.hasOwnProperty('canAdd')) {
		attributes.canAdd = body.canAdd;
	}
	if (body.hasOwnProperty('canView')) {
		attributes.canView = body.canView;
	}
	if (body.hasOwnProperty('canEdit')) {
		attributes.canEdit = body.canEdit;
	}
	if (body.hasOwnProperty('canDelete')) {
		attributes.canDelete = body.canDelete;
	}
	if (body.hasOwnProperty('setAllModeElements')) {
		attributes.setAllModeElements = body.setAllModeElements;
	}
	if (body.hasOwnProperty('setAddModeElements')) {
		attributes.setAddModeElements = body.setAddModeElements;
	}
	if (body.hasOwnProperty('setViewModeElements')) {
		attributes.setViewModeElements = body.setViewModeElements;
	}
	if (body.hasOwnProperty('setEditModeElements')) {
		attributes.setEditModeElements = body.setEditModeElements;
	}
	if (body.hasOwnProperty('setDeleteModeElements')) {
		attributes.setDeleteModeElements = body.setDeleteModeElements;
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
		,{code: { $like: '%' + query.q + '%' }}  
		,{description: { $like: '%' + query.q + '%' }}  
		,{setAllModeElements: { $like: '%' + query.q + '%' }}  
		,{setAddModeElements: { $like: '%' + query.q + '%' }}  
		,{setViewModeElements: { $like: '%' + query.q + '%' }}  
		,{setEditModeElements: { $like: '%' + query.q + '%' }}  
		,{setDeleteModeElements: { $like: '%' + query.q + '%' }}  
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
    if (query.hasOwnProperty('canAdd') && query.canAdd.length > 0) {
			where.canAdd = {
			$eq: query.canAdd
			};
		}
    if (query.hasOwnProperty('canView') && query.canView.length > 0) {
			where.canView = {
			$eq: query.canView
			};
		}
    if (query.hasOwnProperty('canEdit') && query.canEdit.length > 0) {
			where.canEdit = {
			$eq: query.canEdit
			};
		}
    if (query.hasOwnProperty('canDelete') && query.canDelete.length > 0) {
			where.canDelete = {
			$eq: query.canDelete
			};
		}
    
  	if (query.hasOwnProperty('profileId') && query.profileId.length > 0) {
			where.profileId = {
			$eq: query.profileId
			};
		}
    if (query.hasOwnProperty('companyId') && query.companyId.length > 0) {
			where.companyId = {
			$eq: query.companyId
			};
		}
    if (query.hasOwnProperty('divisionId') && query.divisionId.length > 0) {
			where.divisionId = {
			$eq: query.divisionId
			};
		}
    if (query.hasOwnProperty('objectId') && query.objectId.length > 0) {
			where.objectId = {
			$eq: query.objectId
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
  	
module.exports.setClauseProfileId = function (req, where) {
  
    var profileId = parseInt(req.params.profileId, 10);
    where.profileId = {
         $eq: profileId
    };

	return where;
};
	
module.exports.setClauseCompanyId = function (req, where) {
  
    var companyId = parseInt(req.params.companyId, 10);
    where.companyId = {
         $eq: companyId
    };

	return where;
};
	
module.exports.setClauseDivisionId = function (req, where) {
  
    var divisionId = parseInt(req.params.divisionId, 10);
    where.divisionId = {
         $eq: divisionId
    };

	return where;
};
	
module.exports.setClauseObjectId = function (req, where) {
  
    var objectId = parseInt(req.params.objectId, 10);
    where.objectId = {
         $eq: objectId
    };

	return where;
};
	
module.exports.setClauseRuleBookId = function (req, where) {
  
    var ruleBookId = parseInt(req.params.ruleBookId, 10);
    where.ruleBookId = {
         $eq: ruleBookId
    };

	return where;
};
	
module.exports.setClauseParentListId = function (req, where) {
  
    var parentListId = parseInt(req.params.parentListId, 10);
    where.parentListId = {
         $eq: parentListId
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
					|| (req.query.orderBy == 'profileId')
					|| (req.query.orderBy == 'companyId')
					|| (req.query.orderBy == 'divisionId')
					|| (req.query.orderBy == 'objectId')
					|| (req.query.orderBy == 'active')
					|| (req.query.orderBy == 'name')
					|| (req.query.orderBy == 'code')
					|| (req.query.orderBy == 'ruleBookId')
					|| (req.query.orderBy == 'expired')
					|| (req.query.orderBy == 'parent')
					|| (req.query.orderBy == 'parentListId')
					|| (req.query.orderBy == 'description')
					|| (req.query.orderBy == 'canAdd')
					|| (req.query.orderBy == 'canView')
					|| (req.query.orderBy == 'canEdit')
					|| (req.query.orderBy == 'canDelete')
					|| (req.query.orderBy == 'setAllModeElements')
					|| (req.query.orderBy == 'setAddModeElements')
					|| (req.query.orderBy == 'setViewModeElements')
					|| (req.query.orderBy == 'setEditModeElements')
					|| (req.query.orderBy == 'setDeleteModeElements')
					|| (req.query.orderBy == 'createdBy')
					|| (req.query.orderBy == 'updatedBy')
					|| (req.query.orderBy == 'createdAt')
					|| (req.query.orderBy == 'updatedAt')
		 
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


 