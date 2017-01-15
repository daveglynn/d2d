                      
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
var ctrlCompany = require('../controllers/company.controller.js');

router
    .route('/')
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.addCompany);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.getCompaniesAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.getCompanyById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.updateCompany);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.deleteCompany);

	
router
    .route('/ruleBook/:ruleBookId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.getCompaniesByRuleBookId);

router
    .route('/parentList/:parentListId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.getCompaniesByParentListId);
router
    .route('/dropdown')
	.get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlCompany.getCompaniesDropdown);
 
 

module.exports = router