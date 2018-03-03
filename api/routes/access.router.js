                      
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 router
******************************************************************************************************/
"use strict";
var express = require('express'), app = express();
var router = express.Router();
var _ = require('underscore');
var db = require('../.././db.js');
var middleware = require('../.././middleware.js')(db);
var ctrlAccess = require('../controllers/access.controller.js');

router
    .route('/')
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.addAccess);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.updateAccess);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.deleteAccess);

	
router
    .route('/ruleBook/:ruleBookId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessByRuleBookId);

router
    .route('/parentList/:parentListId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessByParentListId);

router
    .route('/profile/:profileId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessByProfileId);

router
    .route('/company/:companyId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessByCompanyId);

router
    .route('/division/:divisionId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessByDivisionId);

router
    .route('/object/:objectId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessByObjectId);
router
    .route('/dropdown')
	.get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlAccess.getAccessDropdown);
 
 

module.exports = router