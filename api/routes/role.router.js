                      
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
var ctrlRole = require('../controllers/role.controller.js');

router
    .route('/')
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.addRole);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.getRolesAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.getRoleById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.updateRole);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.deleteRole);

	
router
    .route('/ruleBook/:ruleBookId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.getRolesByRuleBookId);

router
    .route('/parentList/:parentListId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.getRolesByParentListId);
router
    .route('/dropdown')
	.get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlRole.getRolesDropdown);
 
 

module.exports = router